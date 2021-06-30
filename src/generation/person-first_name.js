// Chooses random first name for support worker based on gender.

const randomTasks = require("../common/random-tasks");
const nameGender = require("../common/name-gender");


// Main function.
function chooseRandomFirstName(possibleNames, chosenGenderFlag)
{
	var choiceRes = "";
	
	if (chosenGenderFlag > 0)
	{
		// Male, choose Male or Unisex.
		choiceRes = getGenderName(possibleNames, nameGender.options.MALE);
	}
	else if (chosenGenderFlag < 0)
	{
		// Female, choose Female or Unisex.
		choiceRes = getGenderName(possibleNames, nameGender.options.FEMALE);
	}
	else
	{
		// Other, choose any name.
		choiceRes = getAnyName(possibleNames);
	}
	
	return choiceRes;
}


// Retrieve random name according to gender.
function getGenderName(namesArr, targetGender)
{
	var currentIndex = -1;
	var currentObject = {};
	var loopRes = "";
	
	// Loop until name chosen.
	while (loopRes === "")
	{
		// Choose random name.
		currentIndex = randomTasks.rollElement(namesArr.length);
		currentObject = namesArr[currentIndex];
		
		if (currentObject.gender === targetGender || currentObject.gender === nameGender.options.UNISEX)
		{
			// Compatible name found.
			loopRes = currentObject.name;
		}
	}
	
	return loopRes;
}


// Retrieve any name regardless of gender.
function getAnyName(namesArr)
{
	var randIndex = randomTasks.rollElement(namesArr.length);
	var randObject = namesArr[randIndex];
	return randObject.name;
}


module.exports =
{
	chooseRandom: chooseRandomFirstName
};