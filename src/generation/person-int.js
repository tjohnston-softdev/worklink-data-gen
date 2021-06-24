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




module.exports =
{
	chooseID: chooseRandomID,
	chooseTravelTime: chooseRandomTravelTime
};