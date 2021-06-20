const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");

function validateAvailabilityProperties(optionsObject, resultObject)
{
	var propIndex = 0;
	var propList = getPropertyNames();
	
	var currentName = "";
	var currentValue = null;
	var currentLabel = "";
	
	while (propIndex >= 0 && propIndex < propList.length && resultObject.valid === true)
	{
		currentName = propList[propIndex];
		currentValue = optionsObject.availability[currentName];
		currentLabel = "availability." + currentName;
		
		validationTasks.checkRange(currentValue, currentLabel, numberLimits.hours, resultObject);
		propIndex = propIndex + 1;
	}
}


function getPropertyNames()
{
	var listRes = [];
	
	listRes.push("minWeeklyHours", "maxWeeklyHours");
	listRes.push("minBlockHours", "maxBlockHours");
	listRes.push("minIntervalHours");
	
	return listRes;
}



module.exports =
{
	validateAvailability: validateAvailabilityProperties
}