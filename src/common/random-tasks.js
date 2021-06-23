function rollPercentageChance(percentVal)
{
	var randomSeed = Math.random();
	var outcomeRes = (randomSeed <= percentVal);
	return outcomeRes;
}


function rollArrayElement(arrLength)
{
	var randomSeed = Math.random() * arrLength;
	var outcomeRes = Math.floor(randomSeed);
	return outcomeRes;
}

function rollIntegerRange(lowerLimit, upperLimit)
{
	var numDiff = upperLimit - lowerLimit;
	var randomSeed = Math.random() * numDiff;
	var outcomeRes = Math.round(lowerLimit + randomSeed);
	return outcomeRes;
}


function rollDecimalRange(lowerLimit, upperLimit)
{
	var numDiff = upperLimit - lowerLimit;
	var randomSeed = Math.random() * numDiff;
	var outcomeRes = lowerLimit + randomSeed;
	return outcomeRes;
}


module.exports =
{
	rollPercent: rollPercentageChance,
	rollElement: rollArrayElement,
	rollInteger: rollIntegerRange,
	rollDecimal: rollDecimalRange
};