const fs = require("fs");
const fsErrors = require("../common/fs-errors");
const maxSizeOptions = defineFileSizeLimit(4000, "4KB");
const maxSizeInput = defineFileSizeLimit(1000000, "1MB");


function checkOptionsFile(targetPath, fileCallback)
{
	var flaggedMessage = "";
	
	fs.stat(targetPath, function(statErr, statRes)
	{
		if (statErr !== null && statErr.code === "ENOENT")
		{
			return fileCallback(null, false);
		}
		else if (statErr !== null)
		{
			flaggedMessage = fsErrors.writeFileCheck("Options", statErr.code, targetPath);
			return fileCallback(new Error(flaggedMessage), null);
		}
		else
		{
			verifyFileEntry(targetPath, "Options", statRes, maxSizeOptions, fileCallback);
		}
	});
}


function checkInputFile(targetPath, inputFileDesc, fileCallback)
{
	var flaggedMessage = "";
	
	fs.stat(targetPath, function(statErr, statRes)
	{
		if (statErr !== null)
		{
			flaggedMessage = fsErrors.writeFileCheck(inputFileDesc, statErr.code, targetPath);
			return fileCallback(new Error(flaggedMessage), null);
		}
		else
		{
			verifyFileEntry(targetPath, inputFileDesc, statRes, maxSizeInput, fileCallback);
		}
	});
}


function verifyFileEntry(tgtPth, fileDesc, statObj, maxSizeObj, verifyCallback)
{
	var correctType = statObj.isFile();
	var verifyMsg = "";
	
	if (correctType === true && statObj.size > 0 && statObj.size <= maxSizeObj.bytes)
	{
		return verifyCallback(null, true);
	}
	else if (correctType === true && statObj.size > maxSizeObj.bytes)
	{
		verifyMsg = fsErrors.writeFileTooLarge(fileDesc, maxSizeObj, tgtPth);
		return verifyCallback(new Error(verifyMsg), null);
	}
	else if (correctType === true)
	{
		verifyMsg = fsErrors.writeFileEmpty(fileDesc, tgtPth);
		return verifyCallback(new Error(verifyMsg), null);
	}
	else
	{
		verifyMsg = fsErrors.writeInvalidFile(fileDesc, tgtPth);
		return verifyCallback(new Error(verifyMsg), null);
	}
}



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