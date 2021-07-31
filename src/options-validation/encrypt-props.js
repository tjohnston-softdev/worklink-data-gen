const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


function validateEncryptionProperties(optionsObject, resultObject)
{
	handleTrueFalseValue(optionsObject.encryption, "enabled", resultObject);
	handleKeyString(optionsObject.encryption.key, resultObject);
	handleTrueFalseValue(optionsObject.encryption, "checkMatch", resultObject);
}


function handleEnabledStatus(givenValue, resObject)
{
	if (resObject.valid === true)
	{
		validationTasks.checkBoolean(givenValue, "encryption.enabled", resObject);
	}
}


function handleTrueFalseValue(encryptObj, propName, resObject)
{
	var givenValue = encryptObj[propName];
	var propString = "encryption." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkBoolean(givenValue, propString, resObject);
	}
}


function handleKeyString(givenString, resObject)
{
	if (resObject.valid === true)
	{
		validationTasks.checkEncryptionString(givenString, "encryption.key", numberLimits.encryptionLength, resObject);
	}
}



module.exports =
{
	validateEncryption: validateEncryptionProperties
};