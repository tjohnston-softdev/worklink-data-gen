const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


function validateAgeProperties(optionsObject, resultObject)
{
	handleAgeNumber(optionsObject, "min", resultObject);
	handleAgeNumber(optionsObject, "max", resultObject);
	handleFeelsLike(optionsObject, resultObject);
	handleOffset(optionsObject, resultObject);
}


function handleAgeNumber(optsObj, propName, resObject)
{
	var givenNumber = optsObj.age[propName];
	var nestString = "age." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkRange(givenNumber, nestString, numberLimits.age, resObject);
	}
}


function handleFeelsLike(optsObj, resObject)
{
	if (resObject.valid === true)
	{
		validationTasks.checkPercentage(optsObj.age.feelsLikeChance, "age.feelsLikeChance", resObject);
	}
}


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