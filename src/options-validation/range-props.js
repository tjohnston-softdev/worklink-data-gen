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
	var nestString = "travelTime." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkNumber(givenNumber, nestString, resObject);
	}
}


function handleViewNumber(optsObj, propName, resObject)
{
	var givenNumber = optsObj.viewsPerDay[propName];
	var nestString = "viewsPerDay." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkRange(givenNumber, nestString, numberLimits.age, resObject);
	}
}


module.exports =
{
	validateTravelTime: validateTravelTimeProperties,
	validateViewsPerDay: validateViewsPerDayProperties
};