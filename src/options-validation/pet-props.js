const validationTasks = require("../common/validation-tasks");

function validateSpecificProperties(optionsObject, resultObject)
{
	handleCountNumber(optionsObject, "minCount", resultObject);
	handleCountNumber(optionsObject, "maxCount", resultObject);
}


function handleCountNumber(optsObj, propName, resObject)
{
	var givenValue = optsObj.pets[propName];
	var nestString = "pets." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkNumber(givenValue, nestString, resObject);
	}
}



module.exports =
{
	validateSpecific: validateSpecificProperties
};