// Script creates 'options.json' file if it does not exist.

const fs = require("fs");
const ora = require("ora");
const storagePaths = require("../storage-paths");
const fsErrors = require("./common/fs-errors");


// Main function.
function performOptionsFileCreation(optionsCallback)
{
	var optionsSpinner = ora("Creating Options File").start();
	
	callFileWrite(function (overallErr, overallRes)
	{
		if (overallErr !== null)
		{
			optionsSpinner.fail("Error creating new options file");
			return optionsCallback(overallErr, null);
		}
		else
		{
			optionsSpinner.succeed("Options file created");
			return optionsCallback(null, true);
		}
	});
}


function callFileWrite(writeCallback)
{
	// Empty JSON.
	var definitionText = "{}";
	var flaggedMessage = "";
	
	fs.writeFile(storagePaths.optionsFile, definitionText, function(writeErr, writeRes)
	{
		if (writeErr !== null)
		{
			// Error.
			flaggedMessage = fsErrors.writeFileCreate("Options", writeErr.code, storagePaths.optionsFile);
			return writeCallback(new Error(flaggedMessage), null);
		}
		else
		{
			// Successful.
			return writeCallback(null, true);
		}
	});
}


module.exports = performOptionsFileCreation;