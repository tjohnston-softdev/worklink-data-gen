const fs = require("fs");
const path = require("path");
const ora = require("ora");
const yieldableJson = require("yieldable-json");
const storedPaths = require("../storage-paths");
const fsErrors = require("./common/fs-errors");


function performPlainBackupExport(backupObject, plainExportCallback)
{
	var arrayGiven = Array.isArray(backupObject);
	
	if (arrayGiven === true && backupObject.length > 0)
	{
		coordinateExport(backupObject, plainExportCallback);
	}
	else
	{
		return plainExportCallback(null, true);
	}
}


function coordinateExport(backupObj, coordCallback)
{
	var exportSpinner = ora("Exporting plain text data").start();
	
	stringifyJsonArray(backupObj, function (expErr, expRes)
	{
		if (expErr !== null)
		{
			exportSpinner.fail("Error exporting plain text data");
			return coordCallback(expErr, null);
		}
		else
		{
			exportSpinner.succeed("Plain text data exported");
			return coordCallback(null, true);
		}
	});
}


function stringifyJsonArray(arrayObject, stringCallback)
{
	var stringMsg = "";
	
	yieldableJson.stringifyAsync(arrayObject, null, 4, 1, function (jsonErr, stringRes)
	{
		if (jsonErr !== null)
		{
			stringMsg = fsErrors.writeJsonStringify("Plain Text Backup", jsonErr.message);
			return stringCallback(new Error(stringMsg), null);
		}
		else
		{
			writeJsonFile(stringRes, stringCallback);
		}
	});
}


function writeJsonFile(fileContents, writeCallback)
{
	var targetOutputPath = path.join(storedPaths.outputFolder, "plain-text.json");
	var writeMsg = "";
	
	fs.writeFile(targetOutputPath, fileContents, function (writeErr, writeRes)
	{
		if (writeErr !== null)
		{
			writeMsg = fsErrors.writeFileCreate("Plain Text Backup", writeErr.code, targetOutputPath);
			return writeCallback(new Error(writeMsg), null);
		}
		else
		{
			return writeCallback(null, true);
		}
	});
}


module.exports = performPlainBackupExport;