const randomTasks = require("../common/random-tasks");


function chooseRandomID(upperID, parentObject)
{
	var chosenID = randomTasks.rollInteger(1, upperID);
	parentObject.push(chosenID);
}


function chooseRandomTravelTime(travelOpts, parentObject)
{
	var chosenTime = randomTasks.rollInteger(travelOpts.min, travelOpts.max);
	parentObject.push(chosenTime);
}


function chooseRandomLanguageFlags(baseChanceOpts, parentObject)
{
	handleFlag(baseChanceOpts.english, parentObject);
	handleFlag(baseChanceOpts.sign, parentObject);
}


function chooseRandomWageSubsidyFlag(baseChanceOpts, parentObject)
{
	handleFlag(baseChanceOpts.wageSubsidy, parentObject);
}


function chooseRandomMiscFlags(baseChanceOpts, parentObject)
{
	handleFlag(baseChanceOpts.vegetarian, parentObject);
	handleFlag(baseChanceOpts.petFriendly, parentObject);
	handleFlag(baseChanceOpts.smoking, parentObject);
	handleFlag(baseChanceOpts.swim, parentObject);
	handleFlag(baseChanceOpts.seasick, parentObject);
}


function chooseRandomInterviewDay(parentObject)
{
	var chosenDay = randomTasks.rollInteger(1, 7);
	parentObject.push(chosenDay);
}


function handleFlag(chancePercent, parentObj)
{
	var rollPassed = randomTasks.rollPercent(chancePercent);
	var flagCast = Number(rollPassed);
	parentObj.push(flagCast);
}




module.exports =
{
	chooseID: chooseRandomID,
	chooseTravelTime: chooseRandomTravelTime,
	chooseLanguageFlags: chooseRandomLanguageFlags,
	chooseWageSubsidyFlag: chooseRandomWageSubsidyFlag,
	chooseMiscFlags: chooseRandomMiscFlags,
	chooseInterviewDay: chooseRandomInterviewDay
};