const ora = require("ora");
const storedPaths = require("../storage-paths");
const checkFileExists = require("./input/check-file-exists");
const readOptions = require("./input/read-options");
const validationTasks = require("./common/validation-tasks");
const baseType = require("./options-validation/base-type");
const basicProps = require("./options-validation/basic-props");
const ageProps = require("./options-validation/age-props");
const keywordProps = require("./options-validation/keyword-props");
const rangeProps = require("./options-validation/range-props");
const chanceProps = require("./options-validation/base-chance-props");
const listEntryProps = require("./options-validation/list-entry-props");
const petProps = require("./options-validation/pet-props");
const prevExperienceProps = require("./options-validation/prev-experience-props");
const availabilityProps = require("./options-validation/availability-props");
const swapRanges = require("./options-validation/swap-ranges");

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
		basicProps.validateMinRegisterDate(fileContents, validationResultObject);
		basicProps.validateGenders(fileContents, validationResultObject);
		ageProps.validateAge(fileContents, validationResultObject);
		rangeProps.validatePasswordLength(fileContents, validationResultObject);
		basicProps.validateAbout(fileContents, validationResultObject);
		keywordProps.validateKeywords(fileContents, "skillDescription", false, validationResultObject);
		keywordProps.validateKeywords(fileContents, "apperanceDescription", true, validationResultObject);
		rangeProps.validateTravelTime(fileContents, validationResultObject);
		chanceProps.validateChances(fileContents, validationResultObject);
		rangeProps.validateViewsPerDay(fileContents, validationResultObject);
		listEntryProps.validateEntries(fileContents, validationResultObject);
		listEntryProps.validatePetsBase(fileContents, validationResultObject);
		petProps.validateSpecific(fileContents, validationResultObject);
		listEntryProps.validatePreviousExperienceBase(fileContents, validationResultObject);
		prevExperienceProps.validateSpecific(fileContents, validationResultObject);
		availabilityProps.validateAvailability(fileContents, validationResultObject);
		keywordProps.validateKeywords(fileContents, "otherSpecific", true, validationResultObject);
		keywordProps.validateKeywords(fileContents, "otherGeneral", true, validationResultObject);
	}
	
	
	if (validationResultObject.valid === true)
	{
		swapRanges(fileContents);
		retOptsObj.contents = fileContents;
		return validationCallback(null, retOptsObj);
	}
	else
	{
		return validationCallback(new Error(validationResultObject.errorMessage), null);
	}
}



module.exports = performOptionsFileRead;