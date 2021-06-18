const maxSafeNumber = 10000000000000000000;


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
		resObj.errorMessage = "";
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
		resObj.errorMessage = "";
	}
	else
	{
		resObj.valid = false;
		resObj.errorMessage = "";
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
		resObj.errorMessage = "";
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
		resObj.errorMessage = "";
	}
}


function checkOffsetValue(numValue, numProp, resObj)
{
	var correctType = Number.isFinite(numValue);
	var checkRes = false;
	
	if (correctType === true && numValue >= 0 && numValue <= 1000)
	{
		checkRes = true;
	}
	else
	{
		resObj.valid = false;
		resObj.errorMessage = "";
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
		resObj.errorMessage = "";
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
		resObj.errorMessage = "";
	}
	else
	{
		resObj.valid = false;
		resObj.errorMessage = "";
	}
	
	return checkRes;
}