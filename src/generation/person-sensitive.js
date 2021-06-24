const randomTasks = require("../common/random-tasks");


function writeEmailAddressString(vFirstName, vAccountID, parentObject)
{
	var fullString = [vFirstName, vAccountID, "@example.com"].join("");
	parentObject.push(fullString);
}


function chooseRandomDriversLicenseNumber(parentObject, existingObjects)
{
	var currentSequence = [];
	var currentFullString = "";
	var currentUnique = false;
	
	var finalString = "";
	
	while (finalString === "")
	{
		currentSequence = [];
		currentFullString = "";
		currentUnique = false;
		
		addDigits(currentSequence, 10);
		currentFullString = currentSequence.join("");
		currentUnique = checkNumberUnique(currentFullString, existingObjects, 3);
		
		if (currentUnique === true)
		{
			finalString = currentFullString;
		}
	}
	
	parentObject.push(finalString);
}


function chooseRandomPhoneNumber(parentObject, existingObjects)
{
	var currentSequence = [];
	var currentFullString = "";
	var currentUnique = false;
	
	var finalString = "";
	
	while (finalString === "")
	{
		currentSequence = [0, 4];
		currentFullString = "";
		currentUnique = false;
		
		addDigits(currentSequence, 10);
		currentFullString = currentSequence.join("");
		currentUnique = checkNumberUnique(currentFullString, existingObjects, 4);
		
		if (currentUnique === true)
		{
			finalString = currentFullString;
		}
	}
	
	parentObject.push(finalString);
}


function chooseRandomPassword(passOpts, parentObject)
{
	var chosenLength = randomTasks.rollInteger(passOpts.minCharacters, passOpts.maxCharacters);
	var currentChar = "";
	var finalString = "";
	
	while (finalString.length < chosenLength)
	{
		currentChar = randomTasks.rollChar();
		finalString += currentChar;
	}
	
	parentObject.push(finalString);
}


function addDigits(seqArr, tgtCount)
{
	var currentDigit = -1;
	
	while (seqArr.length < tgtCount)
	{
		currentDigit = randomTasks.rollDigit();
		seqArr.push(currentDigit);
	}
}


function checkNumberUnique(targetString, existArr, colIndex)
{
	var existIndex = 0;
	var currentExistingObject = [];
	var currentNumber = "";
	
	var uniqueRes = true;
	
	while (existIndex >= 0 && existIndex < existArr.length && uniqueRes === true)
	{
		currentExistingObject = existArr[existIndex];
		currentNumber = currentExistingObject[colIndex];
		
		if (currentNumber === targetString)
		{
			uniqueRes = false;
		}
		
		existIndex = existIndex + 1;
	}
	
	return uniqueRes;
}



module.exports =
{
	writeEmailAddress: writeEmailAddressString,
	chooseDriversLicenseNumber: chooseRandomDriversLicenseNumber,
	choosePhoneNumber: chooseRandomPhoneNumber,
	choosePassword: chooseRandomPassword
};