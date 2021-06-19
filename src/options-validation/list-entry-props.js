const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


function validateListEntryProperties(optionsObject, resultObject)
{
	viewEntryObject(optionsObject, "otherLanguages", true, false, resultObject);
	viewEntryObject(optionsObject, "checksClearances", true, true, resultObject);
	viewEntryObject(optionsObject, "personality", false, false, resultObject);
	viewEntryObject(optionsObject, "hobbies", false, false, resultObject);
	viewEntryObject(optionsObject, "gaming", true, false, resultObject);
	viewEntryObject(optionsObject, "allergies", true, false, resultObject);
	viewEntryObject(optionsObject, "fearsPhobias", true, false, resultObject);
	viewEntryObject(optionsObject, "technology", false, false, resultObject);
	viewEntryObject(optionsObject, "qualifications", true, false, resultObject);
	viewEntryObject(optionsObject, "experienceAreas", false, false, resultObject);
}


function validatePetsBaseProperties(optionsObject, resultObject)
{
	var entryName = "pets";
	var entryObject = optionsObject[entryName];
	
	handleChancePercentage(entryObject, entryName, resultObject);
	handleRangeNumber(entryObject, entryName, "minAnimals", resultObject);
	handleRangeNumber(entryObject, entryName, "maxAnimals", resultObject);
}


function validatePreviousExperienceBaseProperties(optionsObject, resultObject)
{
	var entryName = "previousExperience";
	var entryObject = optionsObject[entryName];
	
	handleChancePercentage(entryObject, entryName, resultObject);
	handleRangeNumber(entryObject, entryName, "minPositions", resultObject);
	handleRangeNumber(entryObject, entryName, "maxPositions", resultObject);
}


function viewEntryObject(optionsObj, entryName, useChance, useWillingness, resultObj)
{
	var currentEntryObject = optionsObj[entryName];
	
	if (useChance === true)
	{
		handleChancePercentage(currentEntryObject, entryName, resultObj);
	}
	
	handleRangeNumber(currentEntryObject, entryName, "min", resultObj);
	handleRangeNumber(currentEntryObject, entryName, "max", resultObj);
	
	if (useWillingness === true)
	{
		handleTrueFalse(currentEntryObject, entryName, "showWillingness", resultObj);
	}
}


function handleChancePercentage(entryObj, parentName, resObject)
{
	var givenNumber = entryObj.chance;
	var nestString = getNestString(parentName, "chance");
	
	if (resObject.valid === true)
	{
		validationTasks.checkPercentage(givenNumber, nestString, resObject);
	}
}


function handleRangeNumber(entryObj, parentName, childName, resObject)
{
	var givenNumber = entryObj[childName];
	var nestString = getNestString(parentName, childName);
	
	if (resObject.valid === true)
	{
		validationTasks.checkRange(givenNumber, nestString, numberLimits.listEntries, resObject);
	}
}


function handleTrueFalse(entryObj, parentName, childName, resObject)
{
	var givenStatus = entryObj[childName];
	var nestString = getNestString(parentName, childName);
	
	if (resObject.valid === true)
	{
		validationTasks.checkBoolean(givenStatus, nestString, resObject);
	}
	
}


function getNestString(vParent, vChild)
{
	var nestRes = [vParent, vChild].join(".");
	return nestRes;
}



module.exports =
{
	validateEntries: validateListEntryProperties,
	validatePetsBase: validatePetsBaseProperties,
	validatePreviousExperienceBase: validatePreviousExperienceBaseProperties
};