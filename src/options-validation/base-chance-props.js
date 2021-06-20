const validationTasks = require("../common/validation-tasks");


function validateBaseChanceProperties(optionsObject, resultObject)
{
	var propIndex = 0;
	var propList = getPropertyNames();
	
	var currentName = "";
	var currentValue = null;
	var currentLabel = "";
	
	while (propIndex >= 0 && propIndex < propList.length && resultObject.valid === true)
	{
		currentName = propList[propIndex];
		currentValue = optionsObject.baseChances[currentName];
		currentLabel = "baseChances." + currentName;
		
		validationTasks.checkPercentage(currentValue, currentLabel, resultObject);
		propIndex = propIndex + 1;
	}
}


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