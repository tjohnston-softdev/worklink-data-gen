const randomTasks = require("../common/random-tasks");
const rowCounts = require("../common/row-counts");


function generateListEntries(genOpts, accountNumber, genResObj)
{
	mapOptional(genOpts.otherLanguages, accountNumber, genResObj, "otherLanguages", rowCounts.languages);
	mapChecksClearances(genOpts.checksClearances, accountNumber, genResObj);
}


function mapRequired(mapOpts, accountNum, genRes, tblProp, tblMaxID)
{
	var chosenRowCount = randomTasks.rollInteger(mapOpts.min, mapOpts.max);
	var keySequence = chooseKeys(chosenRowCount, tblMaxID);
	insertGeneral(genRes, tblProp, accountNum, keySequence);
}


function mapOptional(mapOpts, accountNum, genRes, tblProp, tblMaxID)
{
	var canGenerate = randomTasks.rollPercent(mapOpts.chance);
	var chosenRowCount = -1;
	var keySequence = [];
	
	if (canGenerate === true)
	{
		chosenRowCount = randomTasks.rollInteger(mapOpts.min, mapOpts.max);
		keySequence = chooseKeys(chosenRowCount, tblMaxID);
		insertGeneral(genRes, tblProp, accountNum, keySequence);
	}
}


function mapChecksClearances(mapOpts, accountNum, genRes)
{
	var canGenerate = randomTasks.rollPercent(mapOpts.chance);
	var chosenRowCount = -1;
	var keySequence = [];
	
	if (canGenerate === true)
	{
		chosenRowCount = randomTasks.rollInteger(mapOpts.min, mapOpts.max);
		keySequence = chooseKeys(chosenRowCount, rowCounts.checks);
	}
	else if (mapOpts.showWillingness === true)
	{
		keySequence = handleCheckWillingness();
	}
	else
	{
		keySequence = [];
	}
	
	insertGeneral(genRes, "checks", accountNum, keySequence);
}


function chooseKeys(chosenAmount, maxID)
{
	var targetLength = Math.min(chosenAmount, maxID);
	var currentID = -1;
	var currentUsed = false;
	var choiceRes = [];
	
	while (choiceRes.length < targetLength)
	{
		currentID = randomTasks.rollInteger(1, maxID);
		currentUsed = choiceRes.includes(currentID);
		
		if (currentUsed !== true)
		{
			choiceRes.push(currentID);
		}
	}
	
	return choiceRes;
}


function handleCheckWillingness()
{
	var willPass = randomTasks.rollPercent(0.5);
	var handleRes = [1];
	
	if (willPass === true)
	{
		handleRes.push(2);
	}
	
	return handleRes;
}


function insertGeneral(resultData, tProp, accNum, keySeq)
{
	var insertIndex = 0;
	var currentKey = -1;
	var currentRow = [];
	
	for (insertIndex = 0; insertIndex < keySeq.length; insertIndex = insertIndex + 1)
	{
		currentKey = keySeq[insertIndex];
		currentRow = [accNum, currentKey];
		resultData[tProp].push(currentRow);
	}
}



module.exports =
{
	generateEntries: generateListEntries
};