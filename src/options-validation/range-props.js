const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


function validateTravelTimeProperties(optionsObject, resultObject)
{
	handleTimeNumber(optionsObject, "min", resultObject);
	handleTimeNumber(optionsObject, "max", resultObject);
}

function validateViewsPerDayProperties(optionsObject, resultObject)
{
	handleViewNumber(optionsObject, "min", resultObject);
	handleViewNumber(optionsObject, "max", resultObject);
}


function handleTimeNumber(optsObj, propName, resObject)
{
	var givenNumber = optsObj.travelTime[propName];
	var propString = "travelTime." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkNumber(givenNumber, propString, resObject);
	}
}


function handleViewNumber(optsObj, propName, resObject)
{
	var givenNumber = optsObj.viewsPerDay[propName];
	var propString = "viewsPerDay." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkRange(givenNumber, propString, numberLimits.age, resObject);
	}
}


module.exports =
{
	validateTravelTime: validateTravelTimeProperties,
	validateViewsPerDay: validateViewsPerDayProperties
};