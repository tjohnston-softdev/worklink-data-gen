const path = require("path");
const maxSafeNumber = 10000000000000000000;
const executionTimestamp = new Date();


function defineResultObject()
{
	var defineRes = {valid: true, errorMessage: ""};
	return defineRes;
}


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


function checkNumberValue(numValue, numProp, resObj)
{
	var correctType = Number.isInteger(numValue);
	var checkRes = false;
	
	if (correctType === true && numValue > 0 && numValue <= maxSafeNumber)
	{
		checkRes = true;
	}
	else if (correctType === true && numValue > maxSafeNumber)
	{
		resObj.valid = false;
		resObj.errorMessage = writeNumberTooLargeErrorText(numProp);
	}
	else
	{
		resObj.valid = false;
		resObj.errorMessage = writeNumberErrorText(numProp);
	}
	
	return checkRes;
}

function checkRangeValue(numValue, numProp, rangeObj, resObj)
{
	var correctType = Number.isInteger(numValue);
	var checkRes = false;
	
	if (correctType === true && numValue >= rangeObj.minValue && numValue <= rangeObj.maxValue)
	{
		checkRes = true;
	}
	else
	{
		resObj.valid = false;
		resObj.errorMessage = writeNumberRangeErrorText(numProp, rangeObj);
	}
	
	return checkRes;
}


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


function checkOffsetValue(numValue, numProp, rangeObj, resObj)
{
	var correctType = Number.isFinite(numValue);
	var checkRes = false;
	
	if (correctType === true && numValue >= rangeObj.minValue && numValue <= rangeObj.maxValue)
	{
		checkRes = true;
	}
	else
	{
		resObj.valid = false;
		resObj.errorMessage = writeDecimalRangeErrorText(numProp, rangeObj);
	}
	
	return checkRes;
}


function checkDateStringValue(stringValue, stringProp, resObj)
{
	var givenType = typeof stringValue;
	var timeValue = NaN;
	var timeParsed = false;
	var validDate = false;
	var dateOutcome = {"valid": false, "timestamp": null};
	
	if (givenType === "string")
	{
		dateOutcome.timestamp = new Date(stringValue);
		timeValue = dateOutcome.timestamp.valueOf();
		timeParsed = Number.isInteger(timeValue);
	}
	
	if (timeParsed === true)
	{
		dateOutcome.timestamp.setUTCHours(0, 0, 0, 0);
		validDate = true;
	}
	
	if (validDate === true && dateOutcome.timestamp > executionTimestamp)
	{
		resObj.valid = false;
		resObj.errorMessage = initializeErrorText(stringProp, "cannot be a future date.");
	}
	else if (validDate === true)
	{
		dateOutcome.valid = true;
	}
	else
	{
		resObj.valid = false;
		resObj.errorMessage = writeDateErrorText(stringProp);
	}
	
	return dateOutcome;
}


function checkDayWeightsArrayValue(arrValue, arrProp, resObj)
{
	var correctType = Array.isArray(arrValue);
	var checkRes = false;
	
	if (correctType === true && arrValue.length === 7)
	{
		checkRes = true;
	}
	else if (correctType === true)
	{
		resObj.valid = false;
		resObj.errorMessage = initializeErrorText(arrProp, "must have exactly 7 elements. One for each day of the week.");
	}
	else
	{
		resObj.valid = false;
		resObj.errorMessage = initializeErrorText(arrProp, "must be a valid array object.");
	}
	
	return checkRes;
}


function checkDataLineLengthNumber(dataPath, fileDesc, lengthValue, upperLimit, lineNum, resObj)
{
	var preparedDesc = "";
	var checkRes = false;
	
	if (lengthValue >= 0 && lengthValue <= upperLimit)
	{
		checkRes = true;
	}
	else
	{
		preparedDesc = "Line cannot be longer than " + upperLimit + " characters.";
		resObj.valid = false;
		resObj.errorMessage = writeLineStreamErrorText(fileDesc, dataPath, lineNum, preparedDesc);
	}
	
	return checkRes;
}


function checkDataEntryLengthNumber(dataPath, fileDesc, entryLabel, lengthValue, upperLimit, lineNum, resObj)
{
	var preparedDesc = "";
	var checkRes = -1;
	
	if (lengthValue > 0 && lengthValue <= upperLimit)
	{
		checkRes = 1;
	}
	else if (lengthValue > upperLimit)
	{
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
		checkRes = 0;
	}
	
	return checkRes;
}

function checkCsvColumnCountNumber(dataPath, fileDesc, colCount, colTarget, lineNum, resObj)
{
	var preparedDesc = "";
	var checkRes = false;
	
	if (colCount >= colTarget)
	{
		checkRes = true;
	}
	else
	{
		preparedDesc = "Must have " + colTarget + " columns.";
		resObj.valid = false;
		resObj.errorMessage = writeLineStreamErrorText(fileDesc, dataPath, lineNum, preparedDesc);
	}
	
	return checkRes;
}


function checkNameLengthNumber(dataPath, fileDesc, nameLength, upperLimit, lineNum, resObj)
{
	var preparedDesc = "";
	var checkRes = false;
	
	if (nameLength > 0 && nameLength <= upperLimit)
	{
		checkRes = true;
	}
	else if (nameLength > upperLimit)
	{
		preparedDesc = "Name cannot be longer than " + upperLimit + " characters.";
		resObj.valid = false;
		resObj.errorMessage = writeLineStreamErrorText(fileDesc, dataPath, lineNum, preparedDesc);
	}
	else
	{
		preparedDesc = "Name cannot be empty.";
		resObj.valid = false;
		resObj.errorMessage = writeLineStreamErrorText(fileDesc, dataPath, lineNum, preparedDesc);
	}
	
	return checkRes;
}



function checkGenderFlagResult(dataPath, fileDesc, genderExists, lineNum, resObj)
{
	var preparedDesc = "";
	var checkRes = true;
	
	if (genderExists !== true)
	{
		preparedDesc = "Gender must be 'M', 'F', or 'U'";
		checkRes = false;
		
		resObj.valid = false;
		resObj.errorMessage = writeLineStreamErrorText(fileDesc, dataPath, lineNum, preparedDesc);
	}
	
	return checkRes;
}


function writeNumberErrorText(vProp)
{
	var writeRes = initializeErrorText(vProp, "must be a positive whole number.");
	return writeRes;
}


function writeNumberTooLargeErrorText(vProp)
{
	var writeRes = initializeErrorText(vProp, "is too large to be used safely. Please use a lower number.");
	return writeRes;
}


function writeNumberRangeErrorText(vProp, vRange)
{
	var writeRes = "";
	
	writeRes += initializeErrorText(vProp, "must be a positive, whole number between ");
	writeRes += appendRangeNumbers(vRange);
	
	return writeRes;
}


function writeDecimalRangeErrorText(vProp, vRange)
{
	var writeRes = "";
	
	writeRes += initializeErrorText(vProp, "must be a decimal value between ");
	writeRes += appendRangeNumbers(vRange);
	
	return writeRes;
}

function writeDateErrorText(vProp)
{
	var writeRes = "";
	
	writeRes += initializeErrorText(vProp, "must be a valid date string. ");
	writeRes += "(eg. '2021-06-19')";
	
	return writeRes;
}


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


function initializeErrorText(prop, sText)
{
	var quoteRes = ["'", prop, "' ", sText].join("");
	return quoteRes;
}


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
	checkDayWeightsArray: checkDayWeightsArrayValue,
	checkDataLineLength: checkDataLineLengthNumber,
	checkDataEntryLength: checkDataEntryLengthNumber,
	checkCsvColumnCount: checkCsvColumnCountNumber,
	checkNameLength: checkNameLengthNumber,
	checkGenderResult: checkGenderFlagResult
};