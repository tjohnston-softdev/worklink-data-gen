// Script exports backed up plain text data as a JSON file.

const fs = require("fs");
const path = require("path");
const ora = require("ora");
const yieldableJson = require("yieldable-json");
const storedPaths = require("../storage-paths");
const fsErrors = require("./common/fs-errors");


// Main function.
function performPlainBackupExport(backupObject, plainExportCallback)
{
	var arrayGiven = Array.isArray(backupObject);
	
	if (arrayGiven === true && backupObject.length > 0)
	{
		// Save backup file.
		coordinateExport(backupObject, plainExportCallback);
	}
	else
	{
		// Data was not encrypted - Skip this.
		return plainExportCallback(null, true);
	}
}


// Loading spinner.
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


// Convert plain text data array to JSON definition string.
function stringifyJsonArray(arrayObject, stringCallback)
{
	var stringMsg = "";
	
	// Extra arguments ensure proper formatting.
	yieldableJson.stringifyAsync(arrayObject, null, 4, 1, function (jsonErr, stringRes)
	{
		if (jsonErr !== null)
		{
			// JSON string error.
			stringMsg = fsErrors.writeJsonStringify("Plain Text Backup", jsonErr.message);
			return stringCallback(new Error(stringMsg), null);
		}
		else
		{
			// Write definition to file.
			writeJsonFile(stringRes, stringCallback);
		}
	});
}


// Save definition text as JSON file.
function writeJsonFile(fileContents, writeCallback)
{
	var targetOutputPath = path.join(storedPaths.outputFolder, "plain-text.json");
	var writeMsg = "";
	
	fs.writeFile(targetOutputPath, fileContents, function (writeErr, writeRes)
	{
		if (writeErr !== null)
		{
			// Save error.
			writeMsg = fsErrors.writeFileCreate("Plain Text Backup", writeErr.code, targetOutputPath);
			return writeCallback(new Error(writeMsg), null);
		}
		else
		{
			// Save successful.
			return writeCallback(null, true);
		}
	});
}


module.exports = performPlainBackupExport;