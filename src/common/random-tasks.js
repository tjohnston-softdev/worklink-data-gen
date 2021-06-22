function rollPercentageChance(percentVal)
{
	var randomSeed = Math.random();
	var chanceRes = (randomSeed <= percentVal);
	return chanceRes;
}


module.exports =
{
	rollPercent: rollPercentageChance
};