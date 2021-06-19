const maxSafeNumber = 10000000000000000000;


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
	var parsedDateObject = null;
	var timeValue = NaN;
	var checkRes = false;
	
	if (givenType === "string")
	{
		parsedDateObject = new Date(stringValue);
		timeValue = parsedDateObject.valueOf();
		checkRes = Number.isInteger(timeValue);
	}
	
	if (checkRes !== true)
	{
		resObj.valid = false;
		resObj.errorMessage = writeDateErrorText(stringProp);
	}
	
	return checkRes;
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
	defineResult: defineResultObject,
	checkBoolean: checkBooleanValue,
	checkNumber: checkNumberValue,
	checkRange: checkRangeValue,
	checkPercentage: checkPercentageValue,
	checkOffset: checkOffsetValue,
	checkDateString: checkDateStringValue,
	checkDayWeightsArray: checkDayWeightsArrayValue
};