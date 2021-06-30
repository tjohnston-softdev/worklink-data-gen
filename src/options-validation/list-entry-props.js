/*
	* Validates list entry option properties, such as 'otherLanguages'
	* Used for many-to-many tables.
	* Can only be used as a base, with unique properties validated separate.
*/

const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");
const nestString = require("../common/nest-string");


// Main function - General.
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


// Main function - Pets base.
function validatePetsBaseProperties(optionsObject, resultObject)
{
	var entryName = "pets";
	var entryObject = optionsObject[entryName];
	
	handleChancePercentage(entryObject, entryName, resultObject);
	handleRangeNumber(entryObject, entryName, "minAnimals", resultObject);
	handleRangeNumber(entryObject, entryName, "maxAnimals", resultObject);
}


// Main function - Previous Experience base.
function validatePreviousExperienceBaseProperties(optionsObject, resultObject)
{
	var entryName = "previousExperience";
	var entryObject = optionsObject[entryName];
	
	handleChancePercentage(entryObject, entryName, resultObject);
	handleRangeNumber(entryObject, entryName, "minPositions", resultObject);
	handleRangeNumber(entryObject, entryName, "maxPositions", resultObject);
}


// Read current general entry.
function viewEntryObject(optionsObj, entryName, useChance, useWillingness, resultObj)
{
	var currentEntryObject = optionsObj[entryName];
	
	if (useChance === true)
	{
		// Chance is optional.
		handleChancePercentage(currentEntryObject, entryName, resultObj);
	}
	
	// Range is required.
	handleRangeNumber(currentEntryObject, entryName, "min", resultObj);
	handleRangeNumber(currentEntryObject, entryName, "max", resultObj);
	
	
	if (useWillingness === true)
	{
		// 'checksClearances' only.
		handleTrueFalse(currentEntryObject, entryName, "showWillingness", resultObj);
	}
}


// Validate chance percentage.
function handleChancePercentage(entryObj, parentName, resObject)
{
	var givenNumber = entryObj.chance;
	var propString = nestString.get(parentName, "chance");
	
	if (resObject.valid === true)
	{
		validationTasks.checkPercentage(givenNumber, propString, resObject);
	}
}


// Validate range number.
function handleRangeNumber(entryObj, parentName, childName, resObject)
{
	var givenNumber = entryObj[childName];
	var propString = nestString.get(parentName, childName);
	
	if (resObject.valid === true)
	{
		validationTasks.checkRange(givenNumber, propString, numberLimits.listEntries, resObject);
	}
}


// Validate True or False.
function handleTrueFalse(entryObj, parentName, childName, resObject)
{
	var givenStatus = entryObj[childName];
	var propString = nestString.get(parentName, childName);
	
	if (resObject.valid === true)
	{
		validationTasks.checkBoolean(givenStatus, propString, resObject);
	}
	
}



module.exports =
{
	validateEntries: validateListEntryProperties,
	validatePetsBase: validatePetsBaseProperties,
	validatePreviousExperienceBase: validatePreviousExperienceBaseProperties
};