const fs = require("fs");
const ora = require("ora");
const storagePaths = require("../storage-paths");
const fsErrors = require("./common/fs-errors");


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
	var definitionText = "{}";
	var flaggedMessage = "";
	
	fs.writeFile(storagePaths.optionsFile, definitionText, function(writeErr, writeRes)
	{
		if (writeErr !== null)
		{
			flaggedMessage = fsErrors.writeFileCreate("Options", writeErr.code, storagePaths.optionsFile);
			return writeCallback(new Error(flaggedMessage), null);
		}
		else
		{
			return writeCallback(null, true);
		}
	});
}


module.exports = performOptionsFileCreation;