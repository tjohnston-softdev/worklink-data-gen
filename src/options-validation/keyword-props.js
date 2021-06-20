const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


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
	var nestString = parentName + ".chance";
	
	if (resObject.valid === true)
	{
		validationTasks.checkPercentage(givenValue, nestString, resObject);
	}
}


function handleKeywordProperty(keywordObj, parentName, childName, resObject)
{
	var givenValue = keywordObj[childName];
	var nestString = [parentName, childName].join(".");
	
	if (resObject.valid === true)
	{
		validationTasks.checkRange(givenValue, nestString, numberLimits.keywords, resObject);
	}
}



module.exports =
{
	validateKeywords: validateKeywordProperties
};