const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");

function validateSupportWorkerCountNumber(optionsObject, resultObject)
{
	if (resultObject.valid === true)
	{
		validationTasks.checkRange(optionsObject.supportWorkerCount, "supportWorkerCount", numberLimits.supportWorkers, resultObject);
	}
}


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
	
	console.log("");
	console.log(optionsObject.minRegDate);
	
}


function validateGenderProperties(optionsObject, resultObject)
{
	handleGenderPercentage(optionsObject, "distribution", resultObject);
	handleGenderPercentage(optionsObject, "otherChance", resultObject);
}


function validateAboutProperty(optionsObject, resultObject)
{
	if (resultObject.valid === true)
	{
		validationTasks.checkRange(optionsObject.aboutQuotes, "aboutQuotes", numberLimits.aboutQuotes, resultObject);
	}
}


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