const randomTasks = require("../common/random-tasks");
const numberLimits = require("../common/number-limits");


function generateAvailabilityRoster(availabilityOptions, accountNumber, genResObj)
{
	var hourNumbers = chooseHours(availabilityOptions);
	insertHours(hourNumbers, accountNumber, genResObj);
}


function chooseHours(availOpts)
{
	var targetCount = randomTasks.rollInteger(availOpts.minWeeklyHours, availOpts.maxWeeklyHours);
	var currentStartHour = -1;
	var currentBlockLength = -1;
	var currentEndHour = -1;
	
	var choiceRes = [];
	
	while (choiceRes.length < targetCount)
	{
		currentStartHour = randomTasks.rollInteger(numberLimits.hours.minValue, numberLimits.hours.maxValue);
		currentBlockLength = randomTasks.rollInteger(availOpts.minBlockHours, availOpts.maxBlockHours);
		allocateBlock(currentStartHour, currentBlockLength, choiceRes);
	}
	
	return choiceRes;
}


function insertHours(chosenHours, accNum, genRes)
{
	var choiceIndex = 0;
	var currentNumber = -1;
	var currentDay = -1;
	var currentHour = -1;
	var currentRow = [];
	
	for (choiceIndex = 0; choiceIndex < chosenHours.length; choiceIndex = choiceIndex + 1)
	{
		currentNumber = chosenHours[choiceIndex];
		currentDay = Math.ceil(currentNumber / 24);
		currentHour = (currentNumber % 24) - 1;
		currentRow = [accNum, currentDay, currentHour];
		
		genRes.avaliability.push(currentRow);
	}
}


function allocateBlock(startHour, allocLength, overallHours)
{
	var currentHour = -1;
	var currentUsed = false;
	var currentNext = startHour;
	
	var loopCounter = 0;
	
	while (loopCounter >= 0 && loopCounter < allocLength)
	{
		currentHour = capHour(currentNext);
		currentUsed = overallHours.includes(currentHour);
		
		if (currentUsed !== true)
		{
			overallHours.push(currentHour);
		}
		
		currentNext = currentHour + 1;
		loopCounter = loopCounter + 1;
	}
}


function capHour(nextNum)
{
	var capRes = 1;
	
	if (nextNum >= numberLimits.hours.minValue && nextNum <= numberLimits.hours.maxValue)
	{
		capRes = nextNum;
	}
	
	return capRes;
}




module.exports =
{
	generateAvailability: generateAvailabilityRoster
};