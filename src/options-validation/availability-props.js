/*
	* Validates availability option properties.
	* All of them are hour numbers.
*/


const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


// Main function.
function validateAvailabilityProperties(optionsObject, resultObject)
{
	var propIndex = 0;
	var propList = getPropertyNames();
	
	var currentName = "";
	var currentValue = null;
	var currentLabel = "";
	
	// Loop validates hour properties.
	while (propIndex >= 0 && propIndex < propList.length && resultObject.valid === true)
	{
		// Read current property value.
		currentName = propList[propIndex];
		currentValue = optionsObject.availability[currentName];
		currentLabel = "availability." + currentName;
		
		// Validate hour number.
		validationTasks.checkRange(currentValue, currentLabel, numberLimits.hours, resultObject);
		propIndex = propIndex + 1;
	}
}


// Property names.
function getPropertyNames()
{
	var listRes = [];
	
	listRes.push("minWeeklyHours", "maxWeeklyHours");
	listRes.push("minBlockHours", "maxBlockHours");
	
	return listRes;
}



module.exports =
{
	validateAvailability: validateAvailabilityProperties
}