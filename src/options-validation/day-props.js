const validationTasks = require("../common/validation-tasks");


function validateInterviewDayProperties(optionsObject, resultObject)
{
	handleObject(optionsObject, resultObject);
	handleElements(optionsObject.interviewDayWeights, resultObject);
}


function handleObject(optsObj, resObject)
{
	if (resObject.valid === true)
	{
		validationTasks.checkDayWeightsArray(optsObj.interviewDayWeights, "interviewDayWeights", resObject);
	}
}


function handleElements(weightArr, resObject)
{
	var elementIndex = 0;
	var loopCutoff = Math.min(7, weightArr.length);
	var currentValue = null;
	
	while (elementIndex >= 0 && elementIndex < loopCutoff && resObject.valid === true)
	{
		currentValue = weightArr[elementIndex];
		validationTasks.checkNumber(currentValue, "interviewDayWeights[x]", resObject);
		elementIndex = elementIndex + 1;
	}
}



module.exports =
{
	validateInterview: validateInterviewDayProperties
};