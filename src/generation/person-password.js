const randomTasks = require("../common/random-tasks");

const characterTypes =
{
	"LOWER": 1,
	"UPPER": 2,
	"DIGIT": 3,
	"SPECIAL": 4
};

function chooseRandomString(parentObject)
{
	var charSlotArray = initializeSlots();
	var lockedTypeArray = [];
	
	setRequiredCharType(charSlotArray, lockedTypeArray, characterTypes.LOWER, 2);
	setRequiredCharType(charSlotArray, lockedTypeArray, characterTypes.UPPER, 2);
	setRequiredCharType(charSlotArray, lockedTypeArray, characterTypes.DIGIT, 2);
	setRequiredCharType(charSlotArray, lockedTypeArray, characterTypes.SPECIAL, 2);
	
	lockedTypeArray = [];
	setCharacters(charSlotArray);
	avoidRepeatCharacters(charSlotArray);
	writeFinalString(charSlotArray, parentObject);
}


function initializeSlots()
{
	var chosenLength = randomTasks.rollInteger(8, 32);
	
	var currentType = -1;
	var currentSlot = {};
	
	var intlRes = [];
	
	while (intlRes.length < chosenLength)
	{
		currentType = randomTasks.rollInteger(1, 4);
		currentSlot = defineCharSlot(currentType);
		intlRes.push(currentSlot);
	}
	
	return intlRes;
}


function setRequiredCharType(slotArray, lockArray, charTypeFlag, reqCount)
{
	var setCount = 0;
	var currentSlotIndex = -1;
	var currentLocked = false;
	var currentSlotObject = {};
	
	while (setCount < reqCount && lockArray.length < slotArray.length)
	{
		currentSlotIndex = randomTasks.rollElement(slotArray.length);
		currentLocked = lockArray.includes(currentSlotIndex);
		currentSlotObject = {};
		
		if (currentLocked !== true)
		{
			currentSlotObject = slotArray[currentSlotIndex];
			currentSlotObject.type = charTypeFlag;
			lockArray.push(currentSlotIndex);
			
			setCount = setCount + 1;
		}
	}
}


function setCharacters(slotArray)
{
	var slotIndex = 0;
	var currentSlot = {};
	var currentChar = "";
	
	for (slotIndex = 0; slotIndex < slotArray.length; slotIndex = slotIndex + 1)
	{
		currentSlot = slotArray[slotIndex];
		currentChar = decideCharacter(currentSlot.type);
		currentSlot.character = currentChar;
	}
}


function avoidRepeatCharacters(slotArray)
{
	var slotIndex = 0;
	var currentSlot = {};
	var currentOrigin = "";
	var currentNextA = "";
	var currentNextB = "";
	var currentReplacement = "";
	
	var iterationValid = true;
	var repeatSafe = false;
	
	while (repeatSafe !== true)
	{
		slotIndex = 0;
		currentSlot = {};
		currentOrigin = "";
		currentNextA = "";
		currentNextB = "";
		currentReplacement = "";
		
		iterationValid = true;
		
		while (slotIndex >= 0 && slotIndex < slotArray.length && iterationValid === true)
		{
			currentSlot = slotArray[slotIndex];
			currentOrigin = currentSlot.character;
			currentNextA = getOffsetCharacter(slotArray, slotIndex, 1);
			currentNextB = getOffsetCharacter(slotArray, slotIndex, 2);
			currentReplacement = "";
			
			if (currentOrigin === currentNextA && currentOrigin === currentNextB)
			{
				currentReplacement = decideCharacter(currentSlot.type);
				currentSlot.character = currentReplacement;
				iterationValid = false;
			}
			
			slotIndex = slotIndex + 1;
		}
		
		repeatSafe = iterationValid;
	}
}


function writeFinalString(slotArray, parentObj)
{
	var slotIndex = 0;
	var currentSlot = {};
	var finalString = "";
	
	for (slotIndex = 0; slotIndex < slotArray.length; slotIndex = slotIndex + 1)
	{
		currentSlot = slotArray[slotIndex];
		finalString += currentSlot.character;
	}
	
	parentObj.push(finalString);
}


function getOffsetCharacter(charArray, originInd, offsetInd)
{
	var targetIndex = originInd + offsetInd;
	var offsetSlot = {};
	var charRes = "";
	
	if (targetIndex >= 0 && targetIndex < charArray.length)
	{
		offsetSlot = charArray[targetIndex];
		charRes = offsetSlot.character;
	}
	
	return charRes;
}


function decideCharacter(slotType)
{
	var charRes = "";
	
	if (slotType === characterTypes.LOWER)
	{
		charRes = randomTasks.rollLowercase();
	}
	else if (slotType === characterTypes.UPPER)
	{
		charRes = randomTasks.rollUppercase();
	}
	else if (slotType === characterTypes.DIGIT)
	{
		charRes = randomTasks.rollDigit();
	}
	else
	{
		charRes = randomTasks.rollSpecial();
	}
	
	return charRes;
}


function defineCharSlot(typeFlag)
{
	var defineRes = {};
	
	defineRes["character"] = "";
	defineRes["type"] = typeFlag;
	
	return defineRes;
}



module.exports =
{
	chooseString: chooseRandomString
};