// Generates availability roster for support worker.

const randomTasks = require("../common/random-tasks");
const numberLimits = require("../common/number-limits");


// Main function.
function generateAvailabilityRoster(availabilityOptions, accountNumber, genResObj)
{
	var hourNumbers = chooseHours(availabilityOptions);
	insertHours(hourNumbers, accountNumber, genResObj);
}


// Choose individual hours throughout week, 1 to 168.
function chooseHours(availOpts)
{
	var targetCount = randomTasks.rollInteger(availOpts.minWeeklyHours, availOpts.maxWeeklyHours);
	var currentStartHour = -1;
	var currentBlockLength = -1;
	var currentEndHour = -1;
	
	var choiceRes = [];
	
	
	// Loop allocates availability until target hour count reached.
	while (choiceRes.length < targetCount)
	{
		currentStartHour = randomTasks.rollInteger(numberLimits.hours.minValue, numberLimits.hours.maxValue);
		currentBlockLength = randomTasks.rollInteger(availOpts.minBlockHours, availOpts.maxBlockHours);
		allocateBlock(currentStartHour, currentBlockLength, choiceRes, targetCount);
	}
	
	return choiceRes;
}


// Insert hour availability rows.
function insertHours(chosenHours, accNum, genRes)
{
	var choiceIndex = 0;
	var currentNumber = -1;
	var currentDay = -1;
	var currentHour = -1;
	var currentRow = [];
	
	for (choiceIndex = 0; choiceIndex < chosenHours.length; choiceIndex = choiceIndex + 1)
	{
		// Converts sequence number to day and hour.
		currentNumber = chosenHours[choiceIndex];
		currentDay = Math.ceil(currentNumber / 24);
		currentHour = currentNumber % 24;
		
		// Add row object.
		currentRow = [accNum, currentDay, currentHour, 1];
		genRes.avaliability.push(currentRow);
	}
}


// Allocates availability hours in a block.
function allocateBlock(startHour, allocLength, overallHours, tgtCount)
{
	var currentHour = -1;
	var currentUsed = false;
	var currentNext = startHour;
	
	var loopCounter = 0;
	
	// Loop allocates set number of hours until end of block, or overall target reached.
	while (loopCounter >= 0 && loopCounter < allocLength && overallHours.length < tgtCount)
	{
		// Check current hour used.
		currentHour = capHour(currentNext);
		currentUsed = overallHours.includes(currentHour);
		
		if (currentUsed !== true)
		{
			// Set available.
			overallHours.push(currentHour);
		}
		
		// Increment loop.
		currentNext = currentHour + 1;
		loopCounter = loopCounter + 1;
	}
}


// Invalid hour numbers will default to 1. - Monday at 12am.
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