// Generates misc number values for Support Workers.

const dayjs = require("dayjs");
const validationTasks = require("../common/validation-tasks");
const randomTasks = require("../common/random-tasks");


// Foreign Key ID.
function chooseRandomID(upperID, parentObject)
{
	var chosenID = randomTasks.rollInteger(1, upperID);
	parentObject.push(chosenID);
}


// Travel time in minutes.
function chooseRandomTravelTime(travelOpts, parentObject)
{
	var chosenTime = randomTasks.rollInteger(travelOpts.min, travelOpts.max);
	parentObject.push(chosenTime);
}


// English and Sign language flags.
function chooseRandomLanguageFlags(baseChanceOpts, parentObject)
{
	handleFlag(baseChanceOpts.english, parentObject);
	handleFlag(baseChanceOpts.sign, parentObject);
}


// Has wage subsidy.
function chooseRandomWageSubsidyFlag(baseChanceOpts, parentObject)
{
	handleFlag(baseChanceOpts.wageSubsidy, parentObject);
}


// Other flags.
function chooseRandomMiscFlags(baseChanceOpts, parentObject)
{
	handleFlag(baseChanceOpts.vegetarian, parentObject);
	handleFlag(baseChanceOpts.petFriendly, parentObject);
	handleFlag(baseChanceOpts.smoking, parentObject);
	handleFlag(baseChanceOpts.swim, parentObject);
	handleFlag(baseChanceOpts.seasick, parentObject);
}


// Interview day.
function chooseRandomInterviewDay(parentObject)
{
	var chosenDay = randomTasks.rollInteger(1, 7);
	parentObject.push(chosenDay);
}


// Profile view count - Range affected by days since register.
function chooseRandomViewsCount(regTime, viewOpts, parentObject)
{
	var daysActive = getDaysActive(regTime);
	var minViewCount = viewOpts.min * daysActive;
	var maxViewCount = viewOpts.max * daysActive;
	var finalViewCount = randomTasks.rollInteger(minViewCount, maxViewCount);
	
	parentObject.push(finalViewCount);
}


// Generates positive flag based on random chance.
function handleFlag(chancePercent, parentObj)
{
	var rollPassed = randomTasks.rollPercent(chancePercent);
	var flagCast = Number(rollPassed);
	parentObj.push(flagCast);
}


// Gets number of days since registration.
function getDaysActive(rTime)
{
	var baseValue = rTime.diff(validationTasks.execTimestamp, "day");
	var dayRes = Math.abs(baseValue);
	return dayRes;
}




module.exports =
{
	chooseID: chooseRandomID,
	chooseTravelTime: chooseRandomTravelTime,
	chooseLanguageFlags: chooseRandomLanguageFlags,
	chooseWageSubsidyFlag: chooseRandomWageSubsidyFlag,
	chooseMiscFlags: chooseRandomMiscFlags,
	chooseInterviewDay: chooseRandomInterviewDay,
	chooseViews: chooseRandomViewsCount
};