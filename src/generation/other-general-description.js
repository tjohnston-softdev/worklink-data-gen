/*
	* Generates 'otherGeneral' description.
	* Uses keywords from different sets.
*/

const randomTasks = require("../common/random-tasks");
const addSeparator = require("../common/add-separator");
const keywordPool = defineKeywordPool();


// Main function.
function writeDescriptionString(descOpts, kwordsObj, parentObject)
{
	var canWrite = randomTasks.rollPercent(descOpts.chance);
	var chosenKeywordCount = -1;
	var chosenKeywordObjects = [];
	
	if (canWrite === true)
	{
		// Write general description.
		chosenKeywordCount = randomTasks.rollInteger(descOpts.minKeywords, descOpts.maxKeywords);
		chosenKeywordObjects = chooseKeywords(chosenKeywordCount, kwordsObj);
		composeText(chosenKeywordObjects, kwordsObj, parentObject);
	}
	else
	{
		// Empty string.
		parentObject.push("");
	}
}


// Chooses keywords for description.
function chooseKeywords(chosenAmount, keyObject)
{
	var currentPoolIndex = -1;
	var currentSetName = "";
	var currentSetObject = [];
	var currentKeywordIndex = -1;
	var currentUsed = false;
	var currentKeywordChoice = {};
	
	var choiceRes = [];
	
	while (choiceRes.length < chosenAmount)
	{
		// Choose keyword set.
		currentPoolIndex = randomTasks.rollElement(keywordPool.length);
		currentSetName = keywordPool[currentPoolIndex];
		currentSetObject = keyObject[currentSetName];
		
		// Choose individual keyword.
		currentKeywordIndex = randomTasks.rollElement(currentSetObject.length);
		
		// Check if already used.
		currentUsed = checkKeywordUsed(currentPoolIndex, currentKeywordIndex, choiceRes);
		currentKeywordChoice = {};
		
		if (currentUsed !== true)
		{
			// Add choice.
			currentKeywordChoice["setNumber"] = currentPoolIndex;
			currentKeywordChoice["wordIndex"] = currentKeywordIndex;
			choiceRes.push(currentKeywordChoice);
		}
	}
	
	return choiceRes;
}


// Writes description text using chosen keywords.
function composeText(seqArray, keyObject, parentObj)
{
	var sequenceIndex = 0;
	var currentMap = {};
	var currentSetName = "";
	var currentSetObject = [];
	var currentText = "";
	
	var fullDesc = "";
	
	// Loop chosen keywords.
	for (sequenceIndex = 0; sequenceIndex < seqArray.length; sequenceIndex = sequenceIndex + 1)
	{
		// Read current keyword.
		currentMap = seqArray[sequenceIndex];
		currentSetName = keywordPool[currentMap.setNumber];
		currentSetObject = keyObject[currentSetName];
		currentText = currentSetObject[currentMap.wordIndex];
		
		// Add to description.
		fullDesc += addSeparator(sequenceIndex, " | ");
		fullDesc += currentText;
	}
	
	// String complete.
	parentObj.push(fullDesc);
}


// Checks if the current keyword has already been used.
function checkKeywordUsed(parentIndex, childIndex, existingEntries)
{
	var entryIndex = 0;
	var currentEntry = {};
	var matchFound = false;
	
	// Loop existing choices until match found.
	while (entryIndex >= 0 && entryIndex < existingEntries.length && matchFound !== true)
	{
		currentEntry = existingEntries[entryIndex];
		
		if (currentEntry.setNumber === parentIndex && currentEntry.wordIndex === childIndex)
		{
			matchFound = true;
		}
		
		entryIndex = entryIndex + 1;
	}
	
	return matchFound;
}


// List of allowed keyword sets.
function defineKeywordPool()
{
	var defineRes = [];
	
	defineRes.push("academicSubjects", "allergies", "animals", "descriptions", "encouragingWords");
	defineRes.push("hobbies", "industries", "ingForms", "monsters", "occupations");
	defineRes.push("technologies", "timeUnits", "games");
	
	return defineRes;
}



module.exports =
{
	writeString: writeDescriptionString
};