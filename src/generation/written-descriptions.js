const randomTasks = require("../common/random-tasks");
const addSeparator = require("../common/add-separator");


function writeAccentString(accentsList, parentObject)
{
	var chosenElement = randomTasks.rollElement(accentsList.length);
	var accentString = accentsList[chosenElement];
	parentObject.push(accentString);
}


function writeAboutString(chosenQuotesCount, quotesList, parentObject)
{
	var quoteSeq = chooseKeywords(chosenQuotesCount, quotesList.length);
	composeText(quoteSeq, quotesList, " ", parentObject);
}


function writeRequiredString(descOpts, keywordList, parentObject, keywordSeparator)
{
	var localSep = decideSeparator(keywordSeparator);
	var chosenKeywordCount = randomTasks.rollInteger(descOpts.minKeywords, descOpts.maxKeywords);
	var keywordSeq = chooseKeywords(chosenKeywordCount, keywordList.length);
	composeText(keywordSeq, keywordList, localSep, parentObject);
}


function writeOptionalString(descOpts, keywordList, parentObject, keywordSeparator)
{
	var canWrite = randomTasks.rollPercent(descOpts.chance);
	var localSep = null;
	var chosenKeywordCount = -1;
	var keywordSeq = [];
	
	if (canWrite === true)
	{
		localSep = decideSeparator(keywordSeparator);
		chosenKeywordCount = randomTasks.rollInteger(descOpts.minKeywords, descOpts.maxKeywords);
		keywordSeq = chooseKeywords(chosenKeywordCount, keywordList.length);
		composeText(keywordSeq, keywordList, localSep, parentObject);
	}
	else
	{
		parentObject.push("");
	}
}


function chooseKeywords(chosenAmount, keyCount)
{
	var targetLength = Math.min(chosenAmount, keyCount);
	var currentIndex = -1;
	var currentUsed = false;
	var choiceRes = [];
	
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


function composeText(elementSeq, keyList, keySep, parentObj)
{
	var sequenceIndex = 0;
	var currentItem = -1;
	var currentText = "";
	
	var fullDesc = "";
	
	for (sequenceIndex = 0; sequenceIndex < elementSeq.length; sequenceIndex = sequenceIndex + 1)
	{
		currentItem = elementSeq[sequenceIndex];
		currentText = "";
		
		if (currentItem >= 0 && currentItem < keyList.length)
		{
			currentText = keyList[currentItem];
		}
		
		if (currentText.length > 0)
		{
			fullDesc += addSeparator(sequenceIndex, keySep);
			fullDesc += currentText;
		}
	}
	
	parentObj.push(fullDesc);
}


function decideSeparator(subjectValue)
{
	var givenType = typeof subjectValue;
	var sepRes = ", ";
	
	if (givenType === "string")
	{
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