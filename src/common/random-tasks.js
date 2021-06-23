function rollPercentageChance(percentVal)
{
	var randomSeed = Math.random();
	var percOutcomeRes = (randomSeed <= percentVal);
	return percOutcomeRes;
}


function rollArrayElement(arrLength)
{
	var randomSeed = Math.random() * arrLength;
	var indOutcomeRes = Math.floor(randomSeed);
	return indOutcomeRes;
}

function rollIntegerRange(lowerLimit, upperLimit)
{
	var numDiff = upperLimit - lowerLimit;
	var randomSeed = Math.random() * numDiff;
	var numOutcomeRes = Math.round(lowerLimit + randomSeed);
	return numOutcomeRes;
}


function rollDecimalRange(lowerLimit, upperLimit)
{
	var numDiff = upperLimit - lowerLimit;
	var randomSeed = Math.random() * numDiff;
	var numOutcomeRes = lowerLimit + randomSeed;
	return numOutcomeRes;
}


function rollDigitCharacter()
{
	var digitOutcomeRes = rollArrayElement(10);
	return digitOutcomeRes;
}


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