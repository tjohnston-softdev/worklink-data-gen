const path = require("path");
const fs = require("fs");
const sqlstring = require("sqlstring");
const fsErrors = require("../common/fs-errors");

function saveSqlFile(targetFolder, fileName, tblName, rowArray, writeCallback)
{
	var fullPath = path.join(targetFolder, fileName);
	var fileContents = writeSqlCommand(tblName, rowArray);
	var fileDesc = writeFileDescription(tblName);
	var flaggedMessage = "";
	
	fs.writeFile(fullPath, fileContents, function (writeErr, writeRes)
	{
		if (writeErr !== null)
		{
			flaggedMessage = fsErrors.writeFileCreate(fileDesc, writeErr.code, fullPath);
			return writeCallback(new Error(flaggedMessage), null);
		}
		else
		{
			return writeCallback(null, true);
		}
	});
}


function writeSqlCommand(tName, rowArr)
{
	var templateString = "INSERT INTO ?? VALUES ?;";
	var paraList = [tName, rowArr];
	var writeRes = sqlstring.format(templateString, paraList);
	
	if (rowArr.length > 0)
	{
		templateString = "INSERT INTO ?? VALUES ?;";
		paraList = [tName, rowArr];
		writeRes = sqlstring.format(templateString, paraList);
	}
	else
	{
		writeRes = "/* EMPTY */";
	}
	
	return writeRes;
}


function writeFileDescription(tName)
{
	var writeRes = "'" + tName + "' data";
	return writeRes;
}



module.exports =
{
	saveSql: saveSqlFile
};