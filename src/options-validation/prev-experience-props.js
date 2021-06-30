/*
	* Validates unique 'previousExperience' properties.
	* Minimum work age, and individual job length.
*/


const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


// Main function.
function validateSpecificProperties(optionsObject, resultObject)
{
	handleRangeNumber(optionsObject, "minWorkAge", numberLimits.age, resultObject);
	handleRangeNumber(optionsObject, "minLengthMonths", numberLimits.jobMonths, resultObject);
	handleRangeNumber(optionsObject, "maxLengthMonths", numberLimits.jobMonths, resultObject);
	handleOngoingChance(optionsObject, resultObject);
}


// Validate hour number.
function handleRangeNumber(optsObj, propName, chosenRange, resObject)
{
	var givenValue = optsObj.previousExperience[propName];
	var propString = "previousExperience." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkRange(givenValue, propString, chosenRange, resObject);
	}
}


// Validate ongoing chance percentage.
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