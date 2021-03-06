// Generates Support Worker previous experience.

const dayjs = require("dayjs");
const randomTasks = require("../common/random-tasks");
const validationTasks = require("../common/validation-tasks");
const dateFormat = require("../common/date-format");


// Main function.
function generatePreviousExperience(experienceOptions, baseObject, accountNumber, kwordsObject, genResObj)
{
	var canGenerate = randomTasks.rollPercent(experienceOptions.chance);
	
	if (canGenerate === true)
	{
		chooseJobs(experienceOptions, baseObject.dateOfBirth, accountNumber, kwordsObject, genResObj);
	}
}


// Generate data rows.
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
		// Choose job title and company.
		currentTitle = getKeyword(kwordsObj.occupations);
		currentCompany = getKeyword(kwordsObj.employers);
		
		// Choose start date.
		currentStartValue = randomTasks.rollInteger(minStart, validationTasks.execTimestamp);
		currentStartDate = dayjs(currentStartValue);
		
		// Choose end date.
		currentLength = randomTasks.rollInteger(expOpts.minLengthMonths, expOpts.maxLengthMonths);
		currentEndDate = currentStartDate.add(currentLength, "month");
		currentEndValue = currentEndDate.valueOf();
		
		// Format dates as strings.
		currentStartString = currentStartDate.format("YYYY-MM-DD");
		currentEndString = handleEndString(currentEndDate, currentEndValue, expOpts.ongoingChance);
		
		// Write description.
		currentDesc = writeDescription(currentCompany, currentTitle, currentEndString);
		
		// Add row object.
		currentRow = [accountNum, positionNumber, currentTitle, currentCompany, currentDesc, currentStartString, currentEndString, 1];
		genRes.previousExperience.push(currentRow);
		
		// Increment loop number, and minimum start.
		positionNumber = positionNumber + 1;
		minStart = currentEndValue + 1;
	}
}


// Converts end date object to string.
function handleEndString(endObj, endVal, contChance)
{
	var futureTime = (endVal > validationTasks.execTimestamp);
	var continueJob = randomTasks.rollPercent(contChance);
	var presentObj = null;
	var handleRes = "";
	
	if (futureTime === true && continueJob === true)
	{
		// Still working at this job.
		handleRes = null;
	}
	else if (futureTime === true)
	{
		// Cap to current date.
		presentObj = dayjs(validationTasks.execTimestamp);
		handleRes = dateFormat.dateOnly(presentObj);
	}
	else
	{
		// Use as is.
		handleRes = dateFormat.dateOnly(endObj);
	}
	
	return handleRes;
}


// Writes experience description.
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


// Choose random keyword.
function getKeyword(kList)
{
	var chosenIndex = randomTasks.rollElement(kList.length);
	var keywordRes = kList[chosenIndex];
	return keywordRes;
}


// Set minimum work time, offset from DOB.
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