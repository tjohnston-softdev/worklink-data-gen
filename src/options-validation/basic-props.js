// Validates basic option properties.

const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


// Support worker count.
function validateSupportWorkerCountNumber(optionsObject, resultObject)
{
	if (resultObject.valid === true)
	{
		validationTasks.checkRange(optionsObject.supportWorkerCount, "supportWorkerCount", numberLimits.supportWorkers, resultObject);
	}
}

// Minimum register date string.
function validateMinRegisterDateString(optionsObject, resultObject)
{
	var dateResult = {};
	
	if (resultObject.valid === true)
	{
		dateResult = validationTasks.checkDateString(optionsObject.minRegDate, "minRegDate", resultObject);
	}
	
	if (dateResult.valid === true)
	{
		optionsObject.minRegDate = dateResult.timestamp;
	}
}


// Gender properties.
function validateGenderProperties(optionsObject, resultObject)
{
	handleGenderPercentage(optionsObject, "distribution", resultObject);
	handleGenderPercentage(optionsObject, "otherChance", resultObject);
}

// About quotes count.
function validateAboutProperty(optionsObject, resultObject)
{
	if (resultObject.valid === true)
	{
		validationTasks.checkRange(optionsObject.aboutQuotes, "aboutQuotes", numberLimits.aboutQuotes, resultObject);
	}
}

// Gender percentage.
function handleGenderPercentage(optsObj, propName, resObject)
{
	var givenPercent = optsObj.genders[propName];
	var propString = "genders." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkPercentage(givenPercent, propString, resObject);
	}
}



module.exports =
{
	validateSupportWorkerCount: validateSupportWorkerCountNumber,
	validateMinRegisterDate: validateMinRegisterDateString,
	validateGenders: validateGenderProperties,
	validateAbout: validateAboutProperty
};