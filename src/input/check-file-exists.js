/*
	* Checks whether a particular file exists.
	* Validates size.
*/

const fs = require("fs");
const fsErrors = require("../common/fs-errors");
const maxSizeOptions = defineFileSizeLimit(4000, "4KB");
const maxSizeInput = defineFileSizeLimit(1000000, "1MB");


// Main function - 'options.json' file.
function checkOptionsFile(targetPath, fileCallback)
{
	var flaggedMessage = "";
	
	// Retrieve file entry.
	fs.stat(targetPath, function(statErr, statRes)
	{
		if (statErr !== null && statErr.code === "ENOENT")
		{
			// File does not exist.
			return fileCallback(null, false);
		}
		else if (statErr !== null)
		{
			// Error.
			flaggedMessage = fsErrors.writeFileCheck("Options", statErr.code, targetPath);
			return fileCallback(new Error(flaggedMessage), null);
		}
		else
		{
			// File exists.
			verifyFileEntry(targetPath, "Options", statRes, maxSizeOptions, fileCallback);
		}
	});
}


// Main function - Input data.
function checkInputFile(targetPath, inputFileDesc, fileCallback)
{
	var flaggedMessage = "";
	
	// Retrieve file entry.
	fs.stat(targetPath, function(statErr, statRes)
	{
		if (statErr !== null)
		{
			// Error.
			flaggedMessage = fsErrors.writeFileCheck(inputFileDesc, statErr.code, targetPath);
			return fileCallback(new Error(flaggedMessage), null);
		}
		else
		{
			// File retrieved.
			verifyFileEntry(targetPath, inputFileDesc, statRes, maxSizeInput, fileCallback);
		}
	});
}


// Validate file entry, including size.
function verifyFileEntry(tgtPth, fileDesc, statObj, maxSizeObj, verifyCallback)
{
	var correctType = statObj.isFile();
	var verifyMsg = "";
	
	if (correctType === true && statObj.size > 0 && statObj.size <= maxSizeObj.bytes)
	{
		// Valid size.
		return verifyCallback(null, true);
	}
	else if (correctType === true && statObj.size > maxSizeObj.bytes)
	{
		// Too large.
		verifyMsg = fsErrors.writeFileTooLarge(fileDesc, maxSizeObj, tgtPth);
		return verifyCallback(new Error(verifyMsg), null);
	}
	else if (correctType === true)
	{
		// Empty.
		verifyMsg = fsErrors.writeFileEmpty(fileDesc, tgtPth);
		return verifyCallback(new Error(verifyMsg), null);
	}
	else
	{
		// Invalid file entry.
		verifyMsg = fsErrors.writeInvalidFile(fileDesc, tgtPth);
		return verifyCallback(new Error(verifyMsg), null);
	}
}


// File size limit in bytes.
function defineFileSizeLimit(limitBytes, limitLabel)
{
	var defineRes = {"bytes": limitBytes, "label": limitLabel};
	return defineRes;
}



module.exports =
{
	checkOptions: checkOptionsFile,
	checkInput: checkInputFile
};