// Validates basic range option properties.

const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


// Main function - Password length.
function validatePasswordLengthProperties(optionsObject, resultObject)
{
	handlePasswordLengthNumber(optionsObject, "minCharacters", resultObject);
	handlePasswordLengthNumber(optionsObject, "maxCharacters", resultObject);
}


// Main function - Travel time.
function validateTravelTimeProperties(optionsObject, resultObject)
{
	handleTimeNumber(optionsObject, "min", resultObject);
	handleTimeNumber(optionsObject, "max", resultObject);
}

// Main function - Profile views per day.
function validateViewsPerDayProperties(optionsObject, resultObject)
{
	handleViewNumber(optionsObject, "min", resultObject);
	handleViewNumber(optionsObject, "max", resultObject);
}


// Password length number.
function handlePasswordLengthNumber(optsObj, propName, resObject)
{
	var givenNumber = optsObj.userPassword[propName];
	var propString = "userPassword." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkRange(givenNumber, propString, numberLimits.passwordLength, resObject);
	}
}


// Travel time number.
function handleTimeNumber(optsObj, propName, resObject)
{
	var givenNumber = optsObj.travelTime[propName];
	var propString = "travelTime." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkNumber(givenNumber, propString, resObject);
	}
}

// View number.
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
	validatePasswordLength: validatePasswordLengthProperties,
	validateTravelTime: validateTravelTimeProperties,
	validateViewsPerDay: validateViewsPerDayProperties
};