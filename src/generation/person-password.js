// Generates passwords for Support Worker account objects.

const randomTasks = require("../common/random-tasks");

const characterTypes =
{
	"LOWER": 1,
	"UPPER": 2,
	"DIGIT": 3,
	"SPECIAL": 4
};


// Main function.
function chooseRandomString(parentObject)
{
	var charSlotArray = initializeSlots();
	var lockedTypeArray = [];
	
	// Ensure required amount of characters for each type.
	setRequiredCharType(charSlotArray, lockedTypeArray, characterTypes.LOWER, 2);
	setRequiredCharType(charSlotArray, lockedTypeArray, characterTypes.UPPER, 2);
	setRequiredCharType(charSlotArray, lockedTypeArray, characterTypes.DIGIT, 2);
	setRequiredCharType(charSlotArray, lockedTypeArray, characterTypes.SPECIAL, 2);
	
	// Generate initial password characters.
	lockedTypeArray = [];
	setCharacters(charSlotArray);
	
	// Replace repeating characters.
	avoidRepeatCharacters(charSlotArray);
	
	// Complete.
	writeFinalString(charSlotArray, parentObject);
}


// Initialize password object.
function initializeSlots()
{
	var chosenLength = randomTasks.rollInteger(8, 32);
	
	var currentType = -1;
	var currentSlot = {};
	
	var intlRes = [];
	
	// Generate chosen amount of password character slots.
	while (intlRes.length < chosenLength)
	{
		// Choose random type.
		currentType = randomTasks.rollInteger(1, 4);
		currentSlot = defineCharSlot(currentType);
		intlRes.push(currentSlot);
	}
	
	return intlRes;
}


// Ensures that a minimum amount of characters in a group will be included.
function setRequiredCharType(slotArray, lockArray, charTypeFlag, reqCount)
{
	var setCount = 0;
	var currentSlotIndex = -1;
	var currentLocked = false;
	var currentSlotObject = {};
	
	// Loop until requirement met, or all slots locked.
	while (setCount < reqCount && lockArray.length < slotArray.length)
	{
		// Choose random character slot.
		currentSlotIndex = randomTasks.rollElement(slotArray.length);
		currentLocked = lockArray.includes(currentSlotIndex);
		currentSlotObject = {};
		
		if (currentLocked !== true)
		{
			// Allocate character type, and lock to prevent changes.
			currentSlotObject = slotArray[currentSlotIndex];
			currentSlotObject.type = charTypeFlag;
			lockArray.push(currentSlotIndex);
			
			setCount = setCount + 1;
		}
	}
}


// Generates initial set of characters for the password.
function setCharacters(slotArray)
{
	var slotIndex = 0;
	var currentSlot = {};
	var currentChar = "";
	
	for (slotIndex = 0; slotIndex < slotArray.length; slotIndex = slotIndex + 1)
	{
		// Set current slot's character.
		currentSlot = slotArray[slotIndex];
		currentChar = decideCharacter(currentSlot.type);
		currentSlot.character = currentChar;
	}
}


// Ensures that no character repeats more than twice in a row.
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
	
	// Outer loop until repetition is safe.
	while (repeatSafe !== true)
	{
		slotIndex = 0;
		currentSlot = {};
		currentOrigin = "";
		currentNextA = "";
		currentNextB = "";
		currentReplacement = "";
		
		iterationValid = true;
		
		// Inner loop reads string for repetition.
		while (slotIndex >= 0 && slotIndex < slotArray.length && iterationValid === true)
		{
			// Read current character.
			currentSlot = slotArray[slotIndex];
			currentOrigin = currentSlot.character;
			
			// Read following characters.
			currentNextA = getOffsetCharacter(slotArray, slotIndex, 1);
			currentNextB = getOffsetCharacter(slotArray, slotIndex, 2);
			currentReplacement = "";
			
			
			if (currentOrigin === currentNextA && currentOrigin === currentNextB)
			{
				// Fail - Choose different character for current slot.
				currentReplacement = decideCharacter(currentSlot.type);
				currentSlot.character = currentReplacement;
				iterationValid = false;
			}
			
			slotIndex = slotIndex + 1;
		}
		
		repeatSafe = iterationValid;
	}
}


// Writes final password string from slot array.
function writeFinalString(slotArray, parentObj)
{
	var slotIndex = 0;
	var currentSlot = {};
	var finalString = "";
	
	// Read characters from slots.
	for (slotIndex = 0; slotIndex < slotArray.length; slotIndex = slotIndex + 1)
	{
		// Add current character.
		currentSlot = slotArray[slotIndex];
		finalString += currentSlot.character;
	}
	
	// Add to account object.
	parentObj.push(finalString);
}


// Reads following slot character based on offset.
function getOffsetCharacter(charArray, originInd, offsetInd)
{
	var targetIndex = originInd + offsetInd;
	var offsetSlot = {};
	var charRes = "";
	
	if (targetIndex >= 0 && targetIndex < charArray.length)
	{
		// Read character slot.
		offsetSlot = charArray[targetIndex];
		charRes = offsetSlot.character;
	}
	
	return charRes;
}


// Generates random character based on type.
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


// Password character slot object.
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