const randomTasks = require("../common/random-tasks");
const nameGender = require("../common/name-gender");


function chooseRandomGender(randOpts)
{
	var useOther = randomTasks.rollPercent(randOpts.otherChance);
	var choiceRes = null;
	
	if (useOther === true)
	{
		choiceRes = 0;
	}
	else
	{
		choiceRes = decideMaleFemale(randOpts.distribution);
	}
	
	return choiceRes;
}


function decideMaleFemale(distValue)
{
	var useFemale = randomTasks.rollPercent(distValue);
	var decisionRes = 1;
	
	if (useFemale === true)
	{
		decisionRes = -1;
	}
	
	return decisionRes;
}



module.exports =
{
	chooseRandom: chooseRandomGender
}