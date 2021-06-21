const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");
const nestString = require("../common/nest-string");


function validateKeywordProperties(optionsObject, propName, useChance, resultObject)
{
	var keywordObject = optionsObject[propName];
	
	if (useChance === true)
	{
		handleChanceProperty(keywordObject, propName, resultObject);
	}
	
	handleKeywordProperty(keywordObject, propName, "minKeywords", resultObject);
	handleKeywordProperty(keywordObject, propName, "maxKeywords", resultObject);
}


function handleChanceProperty(keywordObj, parentName, resObject)
{
	var givenValue = keywordObj.chance;
	var propString = parentName + ".chance";
	
	if (resObject.valid === true)
	{
		validationTasks.checkPercentage(givenValue, propString, resObject);
	}
}


function handleKeywordProperty(keywordObj, parentName, childName, resObject)
{
	var givenValue = keywordObj[childName];
	var propString = nestString.get(parentName, childName);
	
	if (resObject.valid === true)
	{
		validationTasks.checkRange(givenValue, propString, numberLimits.keywords, resObject);
	}
}



module.exports =
{
	validateKeywords: validateKeywordProperties
};