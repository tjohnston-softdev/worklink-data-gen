// Decides support worker gender.

const randomTasks = require("../common/random-tasks");
const nameGender = require("../common/name-gender");


// Main function.
function chooseRandomGender(randOpts)
{
	var useOther = randomTasks.rollPercent(randOpts.otherChance);
	var choiceRes = null;
	
	if (useOther === true)
	{
		// Other.
		choiceRes = 0;
	}
	else
	{
		// Binary.
		choiceRes = decideMaleFemale(randOpts.distribution);
	}
	
	return choiceRes;
}


// Binary gender.
function decideMaleFemale(distValue)
{
	var useFemale = randomTasks.rollPercent(distValue);
	var decisionRes = 1;
	
	if (useFemale === true)
	{
		// Female instead of Male.
		decisionRes = -1;
	}
	
	return decisionRes;
}



module.exports =
{
	chooseRandom: chooseRandomGender
}