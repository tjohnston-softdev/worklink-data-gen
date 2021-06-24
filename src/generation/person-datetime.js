const dayjs = require("dayjs");
const validationTasks = require("../common/validation-tasks");
const randomTasks = require("../common/random-tasks");


function chooseRandomRegisterTime(minTimestamp)
{
	var baseTime = randomTasks.rollInteger(minTimestamp, validationTasks.execTimestamp);
	var choiceRes = dayjs(baseTime);
	return choiceRes;
}


function chooseRandomDOB(regTime, ageOpts)
{
	var oldestDate = regTime.subtract(ageOpts.max, "year");
	var youngestDate = regTime.subtract(ageOpts.min, "year");
	var baseValue = randomTasks.rollInteger(oldestDate, youngestDate);
	var choiceRes = dayjs(baseValue);
	
	choiceRes.hour(0);
	choiceRes.minute(0);
	choiceRes.second(0);
	choiceRes.millisecond(0);
	
	return choiceRes;
}


function calculateChronoAge(dobObject)
{
	var baseValue = dobObject.diff(validationTasks.execTimestamp, "year");
	var ageRes = Math.abs(baseValue);
	return ageRes;
}


function chooseRandomFeelsLikeAge(chronoAge, ageOpts)
{
	var enterValue = randomTasks.rollPercent(ageOpts.feelsLikeChance);
	var youngestFeels = -1;
	var oldestFeels = -1;
	var baseValue = -1;
	var choiceRes = null;
	
	if (enterValue === true)
	{
		youngestFeels = chronoAge * (1 - ageOpts.maxOffset);
		oldestFeels = chronoAge * (1 + ageOpts.maxOffset);
		baseValue = randomTasks.rollDecimal(youngestFeels, oldestFeels);
		choiceRes = Math.round(baseValue);
	}
	
	return choiceRes;
}


function addRegisterTimestamp(regTime, parentObject)
{
	var formatString = regTime.format("YYYY-MM-DD HH:mm:ss");
	parentObject.push(formatString);
}


function addDateOfBirth(dobObject, parentObject)
{
	var formatString = dobObject.format("YYYY-MM-DD");
	parentObject.push(formatString);
}


module.exports =
{
	chooseRegister: chooseRandomRegisterTime,
	chooseDOB: chooseRandomDOB,
	calculateAge: calculateChronoAge,
	chooseFeelsLikeAge: chooseRandomFeelsLikeAge,
	addRegister: addRegisterTimestamp,
	addDOB: addDateOfBirth
};