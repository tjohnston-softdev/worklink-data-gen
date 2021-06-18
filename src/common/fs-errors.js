const path = require("path");


function writeFileCheckError(vFile, vErrorCode, vPath)
{
	var writeRes = "";
	
	writeRes += displaySystemAction("checking", vFile);
	writeRes += parseErrorCode(vErrorCode);
	writeRes += parseTargetPath(vPath);
	
	return writeRes;
}


function writeFileTooLargeError(vFile, vMaxSize, vPath)
{
	var writeRes = "";
	
	writeRes += vFile;
	writeRes += " file cannot be larger than ";
	writeRes += vMaxSize.label;
	writeRes += parseTargetPath(vPath);
	
	return writeRes;
}


function writeFileEmptyError(vFile, vPath)
{
	var writeRes = "";
	
	writeRes += vFile;
	writeRes += " file cannot be empty.";
	writeRes += parseTargetPath(vPath);
	
	return writeRes;
}


function writeInvalidFileError(vFile, vPath)
{
	var writeRes = "";
	
	writeRes += vFile;
	writeRes += " is not a valid file.";
	writeRes += parseTargetPath(vPath);
	
	return writeRes;
}


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
	writeFileTooLarge: writeFileTooLargeError,
	writeFileEmpty: writeFileEmptyError,
	writeInvalidFile: writeInvalidFileError
};