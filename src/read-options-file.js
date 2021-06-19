const series = require("run-series");
const ora = require("ora");
const storedPaths = require("../storage-paths");
const checkFileExists = require("./input/check-file-exists");
const readOptions = require("./input/read-options");
const baseType = require("./options-validation/base-type");
const basicProps = require("./options-validation/basic-props");
const validationTasks = require("./common/validation-tasks");

function performOptionsFileRead(optionsCallback)
{
	var optionsSpinner = ora("Reading Options").start();
	
	coordinateReading(function (overallErr, overallRes)
	{
		if (overallErr !== null)
		{
			optionsSpinner.fail("Error reading options file.");
			return optionsCallback(overallErr, null);
		}
		else if (overallRes.contents !== null)
		{
			optionsSpinner.succeed("Options file read");
			return optionsCallback(null, overallRes);
		}
		else
		{
			optionsSpinner.fail("Options file does not exist");
			return optionsCallback(null, overallRes);
		}
	});
}


function coordinateReading(coordCallback)
{
	var retrievedOptionsObject = {"contents": null};
	
	checkFileExists.checkOptions(storedPaths.optionsFile, function (checkExistErr, optionsFileExists)
	{
		if (checkExistErr !== null)
		{
			return coordCallback(checkExistErr, null);
		}
		else if (optionsFileExists === true)
		{
			callFileOpen(retrievedOptionsObject, coordCallback);
		}
		else
		{
			return coordCallback(null, retrievedOptionsObject);
		}
	});
}


function callFileOpen(retrievedOptions, openCallback)
{
	readOptions(storedPaths.optionsFile, function (openErr, openRes)
	{
		if (openErr !== null)
		{
			return openCallback(openErr, null);
		}
		else
		{
			callOptionsValidation(openRes, retrievedOptions, openCallback);
		}
	});
}


function callOptionsValidation(fileContents, retOptsObj, validationCallback)
{
	var validationResultObject = validationTasks.defineResult();
	var baseTypeValid = baseType.validateType(fileContents, validationResultObject);
	
	if (baseTypeValid === true)
	{
		baseType.setNestedObjects(fileContents);
		basicProps.validateSupportWorkerCount(fileContents, validationResultObject);
		basicProps.validateGenders(fileContents, validationResultObject);
		basicProps.validateMinRegisterDate(fileContents, validationResultObject);
	}
	
	
	if (validationResultObject.valid === true)
	{
		retOptsObj.contents = fileContents;
		return validationCallback(null, retOptsObj);
	}
	else
	{
		return validationCallback(new Error(validationResultObject.errorMessage), null);
	}
}



module.exports = performOptionsFileRead;