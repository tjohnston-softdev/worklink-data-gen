// Validates encryption option properties.

const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");


// Main function.
function validateEncryptionProperties(optionsObject, resultObject)
{
	handleTrueFalseValue(optionsObject.encryption, "enabled", resultObject);
	handleKeyString(optionsObject.encryption.key, resultObject);
	handleTrueFalseValue(optionsObject.encryption, "checkMatch", resultObject);
}


// Boolean value.
function handleTrueFalseValue(encryptObj, propName, resObject)
{
	var givenValue = encryptObj[propName];
	var propString = "encryption." + propName;
	
	if (resObject.valid === true)
	{
		validationTasks.checkBoolean(givenValue, propString, resObject);
	}
}


// Key string.
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