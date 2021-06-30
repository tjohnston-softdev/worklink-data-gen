// Generates random ID for Support Worker video.

const randomTasks = require("../common/random-tasks");
const videoChars = defineVideoChars();


// Main function.
function chooseRandomVideoID(baseChanceOpts, parentObject)
{
	var canWrite = randomTasks.rollPercent(baseChanceOpts.video);
	var choiceRes = null;
	
	if (canWrite === true)
	{
		choiceRes = writeVideoID();
	}
	
	parentObject.push(choiceRes);
}


// Writes ID string.
function writeVideoID()
{
	var currentIndex = -1;
	var currentDecimal = -1;
	var currentChar = "";
	var currentUpper = false;
	
	var writeRes = "";
	
	// Loop adds characters to string.
	while (writeRes.length < 11)
	{
		// Choose current character.
		currentIndex = randomTasks.rollElement(videoChars.length);
		currentDecimal = videoChars[currentIndex];
		currentChar = String.fromCharCode(currentDecimal);
		currentUpper = randomTasks.rollPercent(0.5);
		
		
		if (currentUpper === true)
		{
			// Alphabet characters are used as uppercase 50% of the time.
			currentChar = currentChar.toUpperCase();
		}
		
		
		// Add to string.
		writeRes += currentChar;
	}
	
	return writeRes;
}


// Defines allowed ID characters.
function defineVideoChars()
{
	var defineRes = [];
	
	defineRes.push(45, 95);					// Dash and underscore.
	addChars(48, 57, defineRes);			// Numbers.
	addChars(97, 122, defineRes);			// Alphabet.
	
	return defineRes;
}


// Adds character numbers to allowed set in range.
function addChars(lowerDec, upperDec, numberArray)
{
	var currentNumber = lowerDec;
	
	for (currentNumber = lowerDec; currentNumber <= upperDec; currentNumber = currentNumber + 1)
	{
		numberArray.push(currentNumber);
	}
}



module.exports =
{
	chooseID: chooseRandomVideoID
};