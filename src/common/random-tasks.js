// Functions for generating random values.

const specialChars = "~`!@#$%^&*()-_=+[{]};:<,>.?|";

// Percentage.
function rollPercentageChance(percentVal)
{
	var randomSeed = Math.random();
	var percOutcomeRes = (randomSeed <= percentVal);
	return percOutcomeRes;
}


// Array element index.
function rollArrayElement(arrLength)
{
	var randomSeed = Math.random() * arrLength;
	var indOutcomeRes = Math.floor(randomSeed);
	return indOutcomeRes;
}

// Whole number within range.
function rollIntegerRange(lowerLimit, upperLimit)
{
	var numDiff = upperLimit - lowerLimit;
	var randomSeed = Math.random() * numDiff;
	var numOutcomeRes = Math.round(lowerLimit + randomSeed);
	return numOutcomeRes;
}

// Decimal number within range.
function rollDecimalRange(lowerLimit, upperLimit)
{
	var numDiff = upperLimit - lowerLimit;
	var randomSeed = Math.random() * numDiff;
	var numOutcomeRes = lowerLimit + randomSeed;
	return numOutcomeRes;
}

// Digit: 0-9
function rollDigitCharacter()
{
	var digitOutcomeRes = rollArrayElement(10);
	return digitOutcomeRes;
}


// Uppercase alphabet character for password.
function rollUppercaseCharacter()
{
	var baseNumber = rollIntegerRange(65, 90);
	var upperRes = String.fromCharCode(baseNumber);
	return upperRes;
}

// Lowercase alphabet character for password.
function rollLowercaseCharacter()
{
	var baseChar = rollUppercaseCharacter();
	var lowerRes = baseChar.toLowerCase();
	return lowerRes;
}


// Special characters for password.
function rollSpecialCharacter()
{
	var baseNumber = rollArrayElement(specialChars.length);
	var specialRes = specialChars.charAt(baseNumber);
	return specialRes;
}


module.exports =
{
	rollPercent: rollPercentageChance,
	rollElement: rollArrayElement,
	rollInteger: rollIntegerRange,
	rollDecimal: rollDecimalRange,
	rollDigit: rollDigitCharacter,
	rollUppercase: rollUppercaseCharacter,
	rollLowercase: rollLowercaseCharacter,
	rollSpecial: rollSpecialCharacter
};