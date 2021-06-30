// Write and save SQL data file.

const path = require("path");
const fs = require("fs");
const sqlstring = require("sqlstring");
const fsErrors = require("../common/fs-errors");

// Main function.
function saveSqlFile(targetFolder, fileName, tblName, rowArray, writeCallback)
{
	var fullPath = path.join(targetFolder, fileName);
	var fileContents = writeSqlCommand(tblName, rowArray);
	var fileDesc = writeFileDescription(tblName);
	var flaggedMessage = "";
	
	// Call file write.
	fs.writeFile(fullPath, fileContents, function (writeErr, writeRes)
	{
		if (writeErr !== null)
		{
			// Error.
			flaggedMessage = fsErrors.writeFileCreate(fileDesc, writeErr.code, fullPath);
			return writeCallback(new Error(flaggedMessage), null);
		}
		else
		{
			// Successful.
			return writeCallback(null, true);
		}
	});
}


// Prepares file contents.
function writeSqlCommand(tName, rowArr)
{
	var templateString = "INSERT INTO ?? VALUES ?;";
	var paraList = [tName, rowArr];
	var writeRes = sqlstring.format(templateString, paraList);
	
	if (rowArr.length > 0)
	{
		// Write command.
		templateString = "INSERT INTO ?? VALUES ?;";
		paraList = [tName, rowArr];
		writeRes = sqlstring.format(templateString, paraList);
	}
	else
	{
		// Empty placeholder.
		writeRes = "/* EMPTY */";
	}
	
	return writeRes;
}


// Writes file description string.
function writeFileDescription(tName)
{
	var writeRes = "'" + tName + "' data";
	return writeRes;
}



module.exports =
{
	saveSql: saveSqlFile
};