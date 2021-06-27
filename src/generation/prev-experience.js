const dayjs = require("dayjs");
const randomTasks = require("../common/random-tasks");
const validationTasks = require("../common/validation-tasks");


function generatePreviousExperience(experienceOptions, baseObject, accountNumber, kwordsObject, genResObj)
{
	var canGenerate = randomTasks.rollPercent(experienceOptions.chance);
	
	if (canGenerate === true)
	{
		chooseJobs(experienceOptions, baseObject.dateOfBirth, accountNumber, kwordsObject, genResObj);
	}
}


function chooseJobs(expOpts, dobObject, accountNum, kwordsObj, genRes)
{
	var positionNumber = 1;
	var positionCount = randomTasks.rollInteger(expOpts.minPositions, expOpts.maxPositions);
	var minStart = initializeTimeline(dobObject, expOpts.minWorkAge);
	
	var currentTitle = "";
	var currentCompany = "";
	var currentStartValue = -1;
	var currentStartDate = null;
	var currentLength = -1;
	var currentEndDate = null;
	var currentEndValue = -1;
	var currentStartString = "";
	var currentEndString = "";
	var currentDesc = "";
	var currentRow = [];
	
	while (positionNumber >= 1 && positionNumber <= positionCount && minStart <= validationTasks.execTimestamp)
	{
		currentTitle = getKeyword(kwordsObj.occupations);
		currentCompany = getKeyword(kwordsObj.employers);
		currentStartValue = randomTasks.rollInteger(minStart, validationTasks.execTimestamp);
		currentStartDate = dayjs(currentStartValue);
		currentLength = randomTasks.rollInteger(expOpts.minLengthMonths, expOpts.maxLengthMonths);
		currentEndDate = currentStartDate.add(currentLength, "month");
		currentEndValue = currentEndDate.valueOf();
		currentStartString = currentStartDate.format("YYYY-MM-DD");
		currentEndString = handleEndString(currentEndDate, currentEndValue, expOpts.ongoingChance);
		currentDesc = writeDescription(currentCompany, currentTitle, currentEndString);
		
		currentRow = [accountNum, positionNumber, currentTitle, currentCompany, currentDesc, currentStartString, currentEndString];
		genRes.previousExperience.push(currentRow);
		
		positionNumber = positionNumber + 1;
		minStart = currentEndValue + 1;
	}
}

function handleEndString(endObj, endVal, contChance)
{
	var futureTime = (endVal > validationTasks.execTimestamp);
	var continueJob = randomTasks.rollPercent(contChance);
	var presentObj = null;
	var handleRes = "";
	
	if (futureTime === true && continueJob === true)
	{
		handleRes = null;
	}
	else if (futureTime === true)
	{
		presentObj = dayjs(validationTasks.execTimestamp);
		handleRes = presentObj.format("YYYY-MM-DD");
	}
	else
	{
		handleRes = endObj.format("YYYY-MM-DD");
	}
	
	return handleRes;
}


function writeDescription(vCompany, vTitle, endStr)
{
	var writeRes = "";
	
	writeRes += "I ";
	
	if (endStr !== null)
	{
		writeRes += "used to work ";
	}
	else
	{
		writeRes += "currently work ";
	}
	
	writeRes += "at '";
	writeRes += vCompany;
	writeRes += "' as a ";
	writeRes += vTitle;
	
	return writeRes;
}


function getKeyword(kList)
{
	var chosenIndex = randomTasks.rollElement(kList.length);
	var keywordRes = kList[chosenIndex];
	return keywordRes;
}


function initializeTimeline(dobObj, yearsAdd)
{
	var offsetObject = dobObj.add(yearsAdd, "year");
	var intlRes = offsetObject.valueOf();
	return intlRes;
}


module.exports =
{
	generateExperience: generatePreviousExperience
};