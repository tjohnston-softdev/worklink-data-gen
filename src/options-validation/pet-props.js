/*
	* Validates unique 'pets' properties.
	* Count per animal row.
*/

const validationTasks = require("../common/validation-tasks");


// Main function.
function validateSpecificProperties(optionsObject, resultObject)
{
	handleCountNumber(optionsObject, "minCount", resultObject);
	handleCountNumber(optionsObject, "maxCount", resultObject);
}


// Validate count number.
function handleCountNumber(optsObj, propName, resObject)
{
	var givenValue = optsObj.pets[propName];
	var propString = "pets." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkNumber(givenValue, propString, resObject);
	}
}



module.exports =
{
	validateSpecific: validateSpecificProperties
};