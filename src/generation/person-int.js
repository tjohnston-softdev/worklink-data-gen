const randomTasks = require("../common/random-tasks");


function chooseRandomID(upperID, parentObject)
{
	var chosenID = randomTasks.rollInteger(1, upperID);
	parentObject.push(chosenID);
}




module.exports =
{
	chooseID: chooseRandomID
};