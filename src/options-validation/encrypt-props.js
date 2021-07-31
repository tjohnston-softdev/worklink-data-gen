const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


function validateEncryptionProperties(optionsObject, resultObject)
{
	handleEnabledStatus(optionsObject.encryption.enabled, resultObject);
	handleKeyString(optionsObject.encryption.key, resultObject);
}


function handleEnabledStatus(givenValue, resObject)
{
	if (resObject.valid === true)
	{
		validationTasks.checkBoolean(givenValue, "encryption.enabled", resObject);
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