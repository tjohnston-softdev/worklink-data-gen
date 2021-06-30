// Functions for generating random numbers.


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


// Keyboard character for password.
function rollKeyboardCharacter()
{
	var baseNumber = rollIntegerRange(33, 126);
	var charOutcomeRes = String.fromCharCode(baseNumber);
	return charOutcomeRes;
}


module.exports =
{
	rollPercent: rollPercentageChance,
	rollElement: rollArrayElement,
	rollInteger: rollIntegerRange,
	rollDecimal: rollDecimalRange,
	rollDigit: rollDigitCharacter,
	rollChar: rollKeyboardCharacter
};