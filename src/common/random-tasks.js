function rollPercentageChance(percentVal)
{
	var randomSeed = Math.random();
	var chanceRes = (randomSeed <= percentVal);
	return chanceRes;
}


function rollArrayElement(arrLength)
{
	var randomSeed = Math.random() * arrLength;
	var choiceRes = Math.floor(randomSeed);
	return choiceRes;
}


module.exports =
{
	rollPercent: rollPercentageChance,
	rollElement: rollArrayElement
};