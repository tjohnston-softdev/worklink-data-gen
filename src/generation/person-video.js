const randomTasks = require("../common/random-tasks");
const videoChars = defineVideoChars();


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


function writeVideoID()
{
	var currentIndex = -1;
	var currentDecimal = -1;
	var currentChar = "";
	var currentUpper = false;
	
	var writeRes = "";
	
	while (writeRes.length < 11)
	{
		currentIndex = randomTasks.rollElement(videoChars.length);
		currentDecimal = videoChars[currentIndex];
		currentChar = String.fromCharCode(currentDecimal);
		currentUpper = randomTasks.rollPercent(0.5);
		
		if (currentUpper === true)
		{
			currentChar = currentChar.toUpperCase();
		}
		
		writeRes += currentChar;
	}
	
	return writeRes;
}


function defineVideoChars()
{
	var defineRes = [];
	
	defineRes.push(45, 95);
	addChars(48, 57, defineRes);
	addChars(97, 122, defineRes);
	
	return defineRes;
}


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