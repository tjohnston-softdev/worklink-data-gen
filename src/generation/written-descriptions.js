// Generates written descriptions.

const randomTasks = require("../common/random-tasks");
const addSeparator = require("../common/add-separator");


// Spoken accent.
function writeAccentString(accentsList, parentObject)
{
	var chosenElement = randomTasks.rollElement(accentsList.length);
	var accentString = accentsList[chosenElement];
	parentObject.push(accentString);
}


// About.
function writeAboutString(chosenQuotesCount, quotesList, parentObject)
{
	var quoteSeq = chooseKeywords(chosenQuotesCount, quotesList.length);
	composeText(quoteSeq, quotesList, " ", parentObject);
}


// Required.
function writeRequiredString(descOpts, keywordList, parentObject, keywordSeparator)
{
	var localSep = decideSeparator(keywordSeparator);
	var chosenKeywordCount = randomTasks.rollInteger(descOpts.minKeywords, descOpts.maxKeywords);
	var keywordSeq = chooseKeywords(chosenKeywordCount, keywordList.length);
	composeText(keywordSeq, keywordList, localSep, parentObject);
}


// Optional.
function writeOptionalString(descOpts, keywordList, parentObject, keywordSeparator)
{
	var canWrite = randomTasks.rollPercent(descOpts.chance);
	var localSep = null;
	var chosenKeywordCount = -1;
	var keywordSeq = [];
	
	if (canWrite === true)
	{
		// Write description.
		localSep = decideSeparator(keywordSeparator);
		chosenKeywordCount = randomTasks.rollInteger(descOpts.minKeywords, descOpts.maxKeywords);
		keywordSeq = chooseKeywords(chosenKeywordCount, keywordList.length);
		composeText(keywordSeq, keywordList, localSep, parentObject);
	}
	else
	{
		// Empty string.
		parentObject.push("");
	}
}


// Choose keyword numbers for description text.
function chooseKeywords(chosenAmount, keyCount)
{
	var targetLength = Math.min(chosenAmount, keyCount);
	var currentIndex = -1;
	var currentUsed = false;
	var choiceRes = [];
	
	// Chooses set number of unique keywords.
	while (choiceRes.length < targetLength)
	{
		currentIndex = randomTasks.rollElement(keyCount);
		currentUsed = choiceRes.includes(currentIndex);
		
		if (currentUsed !== true)
		{
			choiceRes.push(currentIndex);
		}
	}
	
	return choiceRes;
}


// Writes description text from chosen keywords.
function composeText(elementSeq, keyList, keySep, parentObj)
{
	var sequenceIndex = 0;
	var currentItem = -1;
	var currentText = "";
	
	var fullDesc = "";
	
	// Loop chosen keywords.
	for (sequenceIndex = 0; sequenceIndex < elementSeq.length; sequenceIndex = sequenceIndex + 1)
	{
		// Read current keyword number.
		currentItem = elementSeq[sequenceIndex];
		currentText = "";
		
		
		if (currentItem >= 0 && currentItem < keyList.length)
		{
			// Retrieve keyword text.
			currentText = keyList[currentItem];
		}
		
		if (currentText.length > 0)
		{
			// Append keyword to text.
			fullDesc += addSeparator(sequenceIndex, keySep);
			fullDesc += currentText;
		}
	}
	
	// Add complete string to object.
	parentObj.push(fullDesc);
}


// Prepares separator text.
function decideSeparator(subjectValue)
{
	var givenType = typeof subjectValue;
	var sepRes = ", ";
	
	if (givenType === "string")
	{
		// Use given value.
		sepRes = subjectValue;
	}
	
	return sepRes;
}



module.exports =
{
	writeAccent: writeAccentString,
	writeAbout: writeAboutString,
	writeRequired: writeRequiredString,
	writeOptional: writeOptionalString
};