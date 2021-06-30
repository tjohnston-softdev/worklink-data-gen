// Validates age option properties.

const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


// Main function.
function validateAgeProperties(optionsObject, resultObject)
{
	handleAgeNumber(optionsObject, "min", resultObject);
	handleAgeNumber(optionsObject, "max", resultObject);
	handleFeelsLike(optionsObject, resultObject);
	handleOffset(optionsObject, resultObject);
}


// Minimum and maximum age.
function handleAgeNumber(optsObj, propName, resObject)
{
	var givenNumber = optsObj.age[propName];
	var propString = "age." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkRange(givenNumber, propString, numberLimits.age, resObject);
	}
}


// 'feels like' age percentage.
function handleFeelsLike(optsObj, resObject)
{
	if (resObject.valid === true)
	{
		validationTasks.checkPercentage(optsObj.age.feelsLikeChance, "age.feelsLikeChance", resObject);
	}
}


// Maximum 'feels like' age offset, decimal percentage.
function handleOffset(optsObj, resObject)
{
	if (resObject.valid === true)
	{
		validationTasks.checkOffset(optsObj.age.maxOffset, "age.maxOffset", numberLimits.feelsLikeOffset, resObject);
	}
}


module.exports =
{
	validateAge: validateAgeProperties
};