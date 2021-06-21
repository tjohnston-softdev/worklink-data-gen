const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


function validateSpecificProperties(optionsObject, resultObject)
{
	handleRangeNumber(optionsObject, "minWorkAge", numberLimits.age, resultObject);
	handleRangeNumber(optionsObject, "minLengthMonths", numberLimits.jobMonths, resultObject);
	handleRangeNumber(optionsObject, "maxLengthMonths", numberLimits.jobMonths, resultObject);
	handleOngoingChance(optionsObject, resultObject);
}


function handleRangeNumber(optsObj, propName, chosenRange, resObject)
{
	var givenValue = optsObj.previousExperience[propName];
	var propString = "previousExperience." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkRange(givenValue, propString, chosenRange, resObject);
	}
}


function handleOngoingChance(optsObj, resObject)
{
	if (resObject.valid === true)
	{
		validationTasks.checkPercentage(optsObj.previousExperience.ongoingChance, "previousExperience.ongoingChance", resObject);
	}
}


module.exports =
{
	validateSpecific: validateSpecificProperties
};