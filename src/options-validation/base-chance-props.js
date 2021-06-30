/*
	* Validates base chance option properties.
	* These are defined in the 'baseChances' child object.
	* All of them are decimal percentages.
*/

const validationTasks = require("../common/validation-tasks");


// Main function.
function validateBaseChanceProperties(optionsObject, resultObject)
{
	var propIndex = 0;
	var propList = getPropertyNames();
	
	var currentName = "";
	var currentValue = null;
	var currentLabel = "";
	
	
	// Loop validates chance properties.
	while (propIndex >= 0 && propIndex < propList.length && resultObject.valid === true)
	{
		// Read current value.
		currentName = propList[propIndex];
		currentValue = optionsObject.baseChances[currentName];
		currentLabel = "baseChances." + currentName;
		
		// Validate percentage.
		validationTasks.checkPercentage(currentValue, currentLabel, resultObject);
		propIndex = propIndex + 1;
	}
}


// Property names.
function getPropertyNames()
{
	var listRes = [];
	
	listRes.push("english", "sign", "vegetarian", "petFriendly");
	listRes.push("smoking", "swim", "seasick", "wageSubsidy", "video");
	
	return listRes;
}



module.exports =
{
	validateChances: validateBaseChanceProperties
};