// Writes error text for file system processes, such as reading a file.

const path = require("path");


// Check file.
function writeFileCheckError(vFile, vErrorCode, vPath)
{
	var writeRes = "";
	
	writeRes += displaySystemAction("checking", vFile);
	writeRes += parseErrorCode(vErrorCode);
	writeRes += parseTargetPath(vPath);
	
	return writeRes;
}

// Read file.
function writeFileReadError(vFile, vErrorCode, vPath)
{
	var writeRes = "";
	
	writeRes += displaySystemAction("reading", vFile);
	writeRes += parseErrorCode(vErrorCode);
	writeRes += parseTargetPath(vPath);
	
	return writeRes;
}

// Create file.
function writeFileCreateError(vFile, vErrorCode, vPath)
{
	var writeRes = "";
	
	writeRes += displaySystemAction("creating", vFile);
	writeRes += parseErrorCode(vErrorCode);
	writeRes += parseTargetPath(vPath);
	
	return writeRes;
}

// File too large.
function writeFileTooLargeError(vFile, vMaxSize, vPath)
{
	var writeRes = "";
	
	writeRes += vFile;
	writeRes += " file cannot be larger than ";
	writeRes += vMaxSize.label;
	writeRes += parseTargetPath(vPath);
	
	return writeRes;
}


// File empty.
function writeFileEmptyError(vFile, vPath)
{
	var writeRes = "";
	
	writeRes += vFile;
	writeRes += " file cannot be empty.";
	writeRes += parseTargetPath(vPath);
	
	return writeRes;
}


// Invalid file entry.
function writeInvalidFileError(vFile, vPath)
{
	var writeRes = "";
	
	writeRes += vFile;
	writeRes += " is not a valid file.";
	writeRes += parseTargetPath(vPath);
	
	return writeRes;
}


// JSON parse.
function writeJsonParseError(vFile, vDesc, vPath)
{
	var writeRes = "";
	
	writeRes += "Error parsing ";
	writeRes += vFile;
	writeRes += " file.\r\n";
	
	writeRes += "Reason: ";
	writeRes += vDesc;
	
	writeRes += parseTargetPath(vPath);
	
	return writeRes;
}


// Adds base text to file errors.
function displaySystemAction(actVerb, actFileDesc)
{
	var dispRes = "";
	
	dispRes += "Error ";
	dispRes += actVerb;
	dispRes += " ";
	dispRes += actFileDesc;
	dispRes += " file - ";
	
	return dispRes;
}


// Converts FS error code to readable description.
function parseErrorCode(eCode)
{
	var parseRes = "";
	
	if (eCode === "EACCES")
	{
		parseRes = "Forbidden by access permissions.";
	}
	else if (eCode === "EISDIR")
	{
		parseRes = "Path refers to a directory.";
	}
	else if (eCode === "EMFILE")
	{
		parseRes = "Too many files are already open.";
	}
	else if (eCode === "ENOENT")
	{
		parseRes = "File does not exist.";
	}
	else if (eCode === "EPERM")
	{
		parseRes = "Operation not permitted.";
	}
	else
	{
		parseRes = "Unknown reason.";
	}
	
	return parseRes;
}


// Adds file path to error message.
function parseTargetPath(relativePath)
{
	var parseRes = "";
	
	parseRes += "\r\n";
	parseRes += "Path: ";
	parseRes += path.resolve(relativePath);
	
	return parseRes;
}



module.exports =
{
	writeFileCheck: writeFileCheckError,
	writeFileRead: writeFileReadError,
	writeFileCreate: writeFileCreateError,
	writeFileTooLarge: writeFileTooLargeError,
	writeFileEmpty: writeFileEmptyError,
	writeInvalidFile: writeInvalidFileError,
	writeJsonParse: writeJsonParseError
};