// Generates sensitive information for Support Worker objects.

const randomTasks = require("../common/random-tasks");


// Writes E-Mail address based on first name and ID.
function writeEmailAddressString(vFirstName, vAccountID, parentObject)
{
	var fullString = [vFirstName, vAccountID, "@example.com"].join("");
	var lowerString = fullString.toLowerCase();
	parentObject.push(lowerString);
}


// Drivers license number.
function chooseRandomDriversLicenseNumber(parentObject, existingObjects)
{
	var currentSequence = [];
	var currentFullString = "";
	var currentUnique = false;
	
	var finalString = "";
	
	
	// Loop until unique number generated.
	while (finalString === "")
	{
		currentSequence = [];
		currentFullString = "";
		currentUnique = false;
		
		// Generate current string.
		addDigits(currentSequence, 10);
		currentFullString = currentSequence.join("");
		currentUnique = checkNumberUnique(currentFullString, existingObjects, 3);
		
		if (currentUnique === true)
		{
			// Complete.
			finalString = currentFullString;
		}
	}
	
	// Add to Support Worker object.
	parentObject.push(finalString);
}


// Phone number.
function chooseRandomPhoneNumber(parentObject, existingObjects)
{
	var currentSequence = [];
	var currentFullString = "";
	var currentUnique = false;
	
	var finalString = "";
	
	
	// Loop until unique number generated.
	while (finalString === "")
	{
		currentSequence = [0, 4];
		currentFullString = "";
		currentUnique = false;
		
		// Generate current string.
		addDigits(currentSequence, 10);
		currentFullString = currentSequence.join("");
		currentUnique = checkNumberUnique(currentFullString, existingObjects, 4);
		
		if (currentUnique === true)
		{
			// Complete.
			finalString = currentFullString;
		}
	}
	
	// Add to Support Worker object.
	parentObject.push(finalString);
}


// Adds random digits to array until target length reached.
function addDigits(seqArr, tgtCount)
{
	var currentDigit = -1;
	
	// Loop until array length reached.
	while (seqArr.length < tgtCount)
	{
		// Choose random digit.
		currentDigit = randomTasks.rollDigit();
		seqArr.push(currentDigit);
	}
}


// Checks whether a string value for a given column is unique.
function checkNumberUnique(targetString, existArr, colIndex)
{
	var existIndex = 0;
	var currentExistingObject = [];
	var currentNumber = "";
	
	var uniqueRes = true;
	
	
	// Loop until match found.
	while (existIndex >= 0 && existIndex < existArr.length && uniqueRes === true)
	{
		// Read current value.
		currentExistingObject = existArr[existIndex];
		currentNumber = currentExistingObject[colIndex];
		
		if (currentNumber === targetString)
		{
			// Match found.
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
	choosePhoneNumber: chooseRandomPhoneNumber
};