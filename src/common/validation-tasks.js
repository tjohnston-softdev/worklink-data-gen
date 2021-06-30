/*
	* Functions to assist with input validation.
	* Stores script execution time to avoid future dates.
*/


const path = require("path");
const maxSafeNumber = 10000000000000000000;
const executionTimestamp = Date.now();


// Validation result object.
function defineResultObject()
{
	var defineRes = {valid: true, errorMessage: ""};
	return defineRes;
}


// Boolean.
function checkBooleanValue(boolValue, boolProp, resObj)
{
	var checkRes = false;
	
	if (boolValue === true || boolValue === false)
	{
		checkRes = true;
	}
	else
	{
		resObj.valid = false;
		resObj.errorMessage = initializeErrorText(boolProp, "must be True or False.");
	}
	
	return checkRes;
}


// Whole number.
function checkNumberValue(numValue, numProp, resObj)
{
	var correctType = Number.isInteger(numValue);
	var checkRes = false;
	
	if (correctType === true && numValue > 0 && numValue <= maxSafeNumber)
	{
		// Valid
		checkRes = true;
	}
	else if (correctType === true && numValue > maxSafeNumber)
	{
		// Unsafe.
		resObj.valid = false;
		resObj.errorMessage = writeNumberTooLargeErrorText(numProp);
	}
	else
	{
		// Invalid type.
		resObj.valid = false;
		resObj.errorMessage = writeNumberErrorText(numProp);
	}
	
	return checkRes;
}


// Whole number within range.
function checkRangeValue(numValue, numProp, rangeObj, resObj)
{
	var correctType = Number.isInteger(numValue);
	var checkRes = false;
	
	if (correctType === true && numValue >= rangeObj.minValue && numValue <= rangeObj.maxValue)
	{
		// Within range.
		checkRes = true;
	}
	else
	{
		// Invalid.
		resObj.valid = false;
		resObj.errorMessage = writeNumberRangeErrorText(numProp, rangeObj);
	}
	
	return checkRes;
}


// Percentage number.
function checkPercentageValue(numValue, numProp, resObj)
{
	var correctType = Number.isFinite(numValue);
	var checkRes = false;
	
	if (correctType === true && numValue >= 0 && numValue <= 1)
	{
		checkRes = true;
	}
	else
	{
		resObj.valid = false;
		resObj.errorMessage = initializeErrorText(numProp, "must be a valid percentage decimal between 0 and 1.");
	}
}


// Offset decimal - uses range.
function checkOffsetValue(numValue, numProp, rangeObj, resObj)
{
	var correctType = Number.isFinite(numValue);
	var checkRes = false;
	
	if (correctType === true && numValue >= rangeObj.minValue && numValue <= rangeObj.maxValue)
	{
		// Valid.
		checkRes = true;
	}
	else
	{
		// Invalid
		resObj.valid = false;
		resObj.errorMessage = writeDecimalRangeErrorText(numProp, rangeObj);
	}
	
	return checkRes;
}


// Date string.
function checkDateStringValue(stringValue, stringProp, resObj)
{
	var givenType = typeof stringValue;
	var castDate = null;
	var origTime = NaN;
	var timeParsed = false;
	var roundTime = NaN;
	var validDate = false;
	var dateOutcome = {"valid": false, "timestamp": null};
	
	if (givenType === "string")
	{
		// Cast string to date object.
		castDate = new Date(stringValue);
		origTime = castDate.valueOf();
		timeParsed = Number.isInteger(origTime);
	}
	
	if (timeParsed === true)
	{
		// Round to current date. Use for validation.
		castDate.setUTCHours(0, 0, 0, 0);
		roundTime = castDate.valueOf();
		validDate = Number.isInteger(roundTime);
	}
	
	
	if (validDate === true && roundTime > executionTimestamp)
	{
		// Future.
		resObj.valid = false;
		resObj.errorMessage = initializeErrorText(stringProp, "cannot be a future date.");
	}
	else if (validDate === true)
	{
		// Valid.
		dateOutcome.valid = true;
		dateOutcome.timestamp = roundTime;
	}
	else
	{
		// Invalid type.
		resObj.valid = false;
		resObj.errorMessage = writeDateErrorText(stringProp);
	}
	
	return dateOutcome;
}


// Length of line within text file.
function checkDataLineLengthNumber(dataPath, fileDesc, lengthValue, upperLimit, lineNum, resObj)
{
	var preparedDesc = "";
	var checkRes = false;
	
	if (lengthValue >= 0 && lengthValue <= upperLimit)
	{
		// Safe.
		checkRes = true;
	}
	else
	{
		// Unsafe.
		preparedDesc = "Line cannot be longer than " + upperLimit + " characters.";
		resObj.valid = false;
		resObj.errorMessage = writeLineStreamErrorText(fileDesc, dataPath, lineNum, preparedDesc);
	}
	
	return checkRes;
}


// Length of text file line after preperation, based on context.
function checkDataEntryLengthNumber(dataPath, fileDesc, entryLabel, lengthValue, upperLimit, lineNum, resObj)
{
	var preparedDesc = "";
	var checkRes = -1;
	
	if (lengthValue > 0 && lengthValue <= upperLimit)
	{
		// Safe length.
		checkRes = 1;
	}
	else if (lengthValue > upperLimit)
	{
		// Too long.
		checkRes = -1;
		
		preparedDesc += entryLabel;
		preparedDesc += " cannot be longer than ";
		preparedDesc += upperLimit;
		preparedDesc += " characters.";
		
		resObj.valid = false;
		resObj.errorMessage = writeLineStreamErrorText(fileDesc, dataPath, lineNum, preparedDesc);
	}
	else
	{
		// Empty.
		checkRes = 0;
	}
	
	return checkRes;
}

// Number of columns in CSV line.
function checkCsvColumnCountNumber(dataPath, fileDesc, colCount, colTarget, lineNum, resObj)
{
	var preparedDesc = "";
	var checkRes = false;
	
	if (colCount >= colTarget)
	{
		// Valid.
		checkRes = true;
	}
	else
	{
		// Invalid
		preparedDesc = "Must have " + colTarget + " columns.";
		resObj.valid = false;
		resObj.errorMessage = writeLineStreamErrorText(fileDesc, dataPath, lineNum, preparedDesc);
	}
	
	return checkRes;
}


// First name length.
function checkNameLengthNumber(dataPath, fileDesc, nameLength, upperLimit, lineNum, resObj)
{
	var preparedDesc = "";
	var checkRes = false;
	
	if (nameLength > 0 && nameLength <= upperLimit)
	{
		// Valid.
		checkRes = true;
	}
	else if (nameLength > upperLimit)
	{
		// Too long.
		preparedDesc = "Name cannot be longer than " + upperLimit + " characters.";
		resObj.valid = false;
		resObj.errorMessage = writeLineStreamErrorText(fileDesc, dataPath, lineNum, preparedDesc);
	}
	else
	{
		// Empty.
		preparedDesc = "Name cannot be empty.";
		resObj.valid = false;
		resObj.errorMessage = writeLineStreamErrorText(fileDesc, dataPath, lineNum, preparedDesc);
	}
	
	return checkRes;
}


// Handles error message for invalid gender character.
function checkGenderFlagResult(dataPath, fileDesc, genderExists, lineNum, resObj)
{
	var preparedDesc = "";
	var checkRes = true;
	
	if (genderExists !== true)
	{
		// Invalid.
		preparedDesc = "Gender must be 'M', 'F', or 'U'";
		checkRes = false;
		
		resObj.valid = false;
		resObj.errorMessage = writeLineStreamErrorText(fileDesc, dataPath, lineNum, preparedDesc);
	}
	
	return checkRes;
}


// Positive whole number error.
function writeNumberErrorText(vProp)
{
	var writeRes = initializeErrorText(vProp, "must be a positive whole number.");
	return writeRes;
}


// Number too large error.
function writeNumberTooLargeErrorText(vProp)
{
	var writeRes = initializeErrorText(vProp, "is too large to be used safely. Please use a lower number.");
	return writeRes;
}

// Number range error.
function writeNumberRangeErrorText(vProp, vRange)
{
	var writeRes = "";
	
	writeRes += initializeErrorText(vProp, "must be a positive, whole number between ");
	writeRes += appendRangeNumbers(vRange);
	
	return writeRes;
}


// Decimal range error.
function writeDecimalRangeErrorText(vProp, vRange)
{
	var writeRes = "";
	
	writeRes += initializeErrorText(vProp, "must be a decimal value between ");
	writeRes += appendRangeNumbers(vRange);
	
	return writeRes;
}


// Date string error.
function writeDateErrorText(vProp)
{
	var writeRes = "";
	
	writeRes += initializeErrorText(vProp, "must be a valid date string. ");
	writeRes += "(eg. '2021-06-19')";
	
	return writeRes;
}


// Line stream error.
function writeLineStreamErrorText(vFile, vPath, vLineNum, vDesc)
{
	var writeRes = "";
	
	writeRes += "Error reading ";
	writeRes += vFile;
	writeRes += " file.\r\n\r\n";
	
	writeRes += "Line Number: ";
	writeRes += vLineNum;
	writeRes += "\r\n";
	
	writeRes += "Description: ";
	writeRes += vDesc;
	writeRes += "\r\n";
	
	writeRes += "Path: ";
	writeRes += path.resolve(vPath);
	
	return writeRes;
}

// Error text template.
function initializeErrorText(prop, sText)
{
	var quoteRes = ["'", prop, "' ", sText].join("");
	return quoteRes;
}


// Adds number range to error text.
function appendRangeNumbers(rNums)
{
	var appendRes = [rNums.minValue, "and", rNums.maxValue].join(" ");
	return appendRes;
}



module.exports =
{
	execTimestamp: executionTimestamp,
	defineResult: defineResultObject,
	checkBoolean: checkBooleanValue,
	checkNumber: checkNumberValue,
	checkRange: checkRangeValue,
	checkPercentage: checkPercentageValue,
	checkOffset: checkOffsetValue,
	checkDateString: checkDateStringValue,
	checkDataLineLength: checkDataLineLengthNumber,
	checkDataEntryLength: checkDataEntryLengthNumber,
	checkCsvColumnCount: checkCsvColumnCountNumber,
	checkNameLength: checkNameLengthNumber,
	checkGenderResult: checkGenderFlagResult
};