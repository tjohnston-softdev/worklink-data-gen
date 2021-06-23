const dayjs = require("dayjs");
const validationTasks = require("../common/validation-tasks");
const randomTasks = require("../common/random-tasks");


function chooseRandomRegisterTime(minTimestamp)
{
	var baseTime = randomTasks.rollNumber(minTimestamp, validationTasks.execTimestamp);
	var choiceRes = dayjs(baseTime);
	return choiceRes;
}


module.exports =
{
	chooseRegister: chooseRandomRegisterTime
};