const randomTasks = require("../common/random-tasks");
const addSeparator = require("../common/add-separator");
const keywordPool = defineKeywordPool();

function writeDescriptionString(descOpts, kwordsObj, parentObject)
{
	var canWrite = randomTasks.rollPercent(descOpts.chance);
	var chosenKeywordCount = -1;
	var chosenKeywordObjects = [];
	
	if (canWrite === true)
	{
		chosenKeywordCount = randomTasks.rollInteger(descOpts.minKeywords, descOpts.maxKeywords);
		chosenKeywordObjects = chooseKeywords(chosenKeywordCount, kwordsObj);
		composeText(chosenKeywordObjects, kwordsObj, parentObject);
	}
	else
	{
		parentObject.push("");
	}
}


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
		currentPoolIndex = randomTasks.rollElement(keywordPool.length);
		currentSetName = keywordPool[currentPoolIndex];
		currentSetObject = keyObject[currentSetName];
		currentKeywordIndex = randomTasks.rollElement(currentSetObject.length);
		currentUsed = checkKeywordUsed(currentPoolIndex, currentKeywordIndex, choiceRes);
		currentKeywordChoice = {};
		
		if (currentUsed !== true)
		{
			currentKeywordChoice["setNumber"] = currentPoolIndex;
			currentKeywordChoice["wordIndex"] = currentKeywordIndex;
			choiceRes.push(currentKeywordChoice);
		}
	}
	
	return choiceRes;
}


function composeText(seqArray, keyObject, parentObj)
{
	var sequenceIndex = 0;
	var currentMap = {};
	var currentSetName = "";
	var currentSetObject = [];
	var currentText = "";
	
	var fullDesc = "";
	
	for (sequenceIndex = 0; sequenceIndex < seqArray.length; sequenceIndex = sequenceIndex + 1)
	{
		currentMap = seqArray[sequenceIndex];
		currentSetName = keywordPool[currentMap.setNumber];
		currentSetObject = keyObject[currentSetName];
		currentText = currentSetObject[currentMap.wordIndex];
		
		fullDesc += addSeparator(sequenceIndex, " | ");
		fullDesc += currentText;
	}
	
	parentObj.push(fullDesc);
}


function checkKeywordUsed(parentIndex, childIndex, existingEntries)
{
	var entryIndex = 0;
	var currentEntry = {};
	var matchFound = false;
	
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


function defineKeywordPool()
{
	var defineRes = [];
	
	defineRes.push("academicSubjects", "allergies", "animals", "descriptions", "encouragingWords");
	defineRes.push("hobbies", "industries", "ingForms", "monsters", "occupations");
	defineRes.push("technologies", "games");
	
	return defineRes;
}



module.exports =
{
	writeString: writeDescriptionString
};