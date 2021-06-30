// Generates date-time related values for support workers.

const dayjs = require("dayjs");
const validationTasks = require("../common/validation-tasks");
const randomTasks = require("../common/random-tasks");
const dateFormat = require("../common/date-format");


// Choose register time.
function chooseRandomRegisterTime(minTimestamp)
{
	var baseTime = randomTasks.rollInteger(minTimestamp, validationTasks.execTimestamp);
	var choiceRes = dayjs(baseTime);
	return choiceRes;
}


// Choose Date of Birth.
function chooseRandomDOB(regTime, ageOpts)
{
	var oldestDate = regTime.subtract(ageOpts.max, "year");
	var youngestDate = regTime.subtract(ageOpts.min, "year");
	var baseValue = randomTasks.rollInteger(oldestDate, youngestDate);
	var choiceRes = dayjs(baseValue);
	
	// Round to date.
	choiceRes.hour(0);
	choiceRes.minute(0);
	choiceRes.second(0);
	choiceRes.millisecond(0);
	
	return choiceRes;
}


// Get chronological age from DOB.
function calculateChronoAge(dobObject)
{
	var baseValue = dobObject.diff(validationTasks.execTimestamp, "year");
	var ageRes = Math.abs(baseValue);
	return ageRes;
}


// Choose 'feels like' age - Offset from chrono age.
function chooseRandomFeelsLikeAge(chronoAge, ageOpts)
{
	var enterValue = randomTasks.rollPercent(ageOpts.feelsLikeChance);
	var youngestFeels = -1;
	var oldestFeels = -1;
	var baseValue = -1;
	var finalValue = -1;
	var numberGenerated = false;
	var choiceRes = null;
	
	if (enterValue === true)
	{
		// Calculate acceptable range.
		youngestFeels = chronoAge * (1 - ageOpts.maxOffset);
		oldestFeels = chronoAge * (1 + ageOpts.maxOffset);
		
		// Choose final value.
		baseValue = randomTasks.rollDecimal(youngestFeels, oldestFeels);
		finalValue = Math.round(baseValue);
		numberGenerated = true;
	}
	
	
	if (numberGenerated === true && finalValue !== chronoAge)
	{
		// Use chosen 'feels like' age.
		choiceRes = finalValue;
	}
	
	return choiceRes;
}


// Formats register time and adds to Support Worker object.
function addRegisterTimestamp(regTime, parentObject)
{
	var formatString = dateFormat.full(regTime);
	parentObject.push(formatString);
}


// Formats DOB and adds to Support Worker object.
function addDateOfBirth(dobObject, parentObject)
{
	var formatString = dateFormat.dateOnly(dobObject);
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