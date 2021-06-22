const randomTasks = require("../common/random-tasks");
const nameGender = require("../common/name-gender");


function chooseRandomFirstName(possibleNames, chosenGenderFlag)
{
	var choiceRes = "";
	
	if (chosenGenderFlag > 0)
	{
		choiceRes = getGenderName(possibleNames, nameGender.options.MALE);
	}
	else if (chosenGenderFlag < 0)
	{
		choiceRes = getGenderName(possibleNames, nameGender.options.FEMALE);
	}
	else
	{
		choiceRes = getAnyName(possibleNames);
	}
	
	return choiceRes;
}


function getGenderStringFromFlag(chosenGenderFlag)
{
	var stringRes = "";
	
	if (chosenGenderFlag > 0)
	{
		stringRes = nameGender.options.MALE;
	}
	else if (chosenGenderFlag < 0)
	{
		stringRes = nameGender.options.FEMALE;
	}
	else
	{
		stringRes = "OTHER";
	}
	
	return stringRes;
}


function getGenderName(namesArr, targetGender)
{
	var currentIndex = -1;
	var currentObject = {};
	var loopRes = "";
	
	while (loopRes === "")
	{
		currentIndex = randomTasks.rollElement(namesArr.length);
		currentObject = namesArr[currentIndex];
		
		if (currentObject.gender === targetGender || currentObject.gender === nameGender.options.UNISEX)
		{
			loopRes = currentObject.name;
		}
	}
	
	return loopRes;
}


function getAnyName(namesArr)
{
	var randIndex = randomTasks.rollElement(namesArr.length);
	var randObject = namesArr[randIndex];
	return randObject.name;
}


module.exports =
{
	chooseRandom: chooseRandomFirstName,
	getGenderString: getGenderStringFromFlag
};