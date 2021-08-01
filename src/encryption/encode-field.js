const cryptoModule = require("crypto");
const encryptionErrors = require("../common/encryption-errors");
const encMethod = "aes-128-cbc";


function encodeFieldString(encOpts, accountObject, fieldIndex, colName, encryptionCallback)
{
	var originalText = accountObject[fieldIndex];
	var fieldCipher = cryptoModule.createCipher(encMethod, encOpts.key);
	var encodedText = "";
	
	var encryptionSuccessful = false;
	var flaggedMessage = "";
	
	encodedText += fieldCipher.update(originalText, 'utf8', 'hex');
	encodedText += fieldCipher.final('hex');
	
	if (encOpts.checkMatch === true)
	{
		encryptionSuccessful = handleComparison(encOpts.key, encodedText, originalText);
	}
	else
	{
		encryptionSuccessful = true;
	}
	
	if (encryptionSuccessful === true)
	{
		accountObject[fieldIndex] = encodedText;
		return encryptionCallback(null, true);
	}
	else
	{
		flaggedMessage = encryptionErrors.writeFieldEncryption(accountObject[0], colName);
		return encryptionCallback(new Error(flaggedMessage), null);
	}
	
}


function handleComparison(encKey, encText, origText)
{
	var fieldDecipher = cryptoModule.createDecipher(encMethod, encKey);
	var decodedText = "";
	var matchFound = false;
	
	decodedText += fieldDecipher.update(encText, 'hex', 'utf8');
	decodedText += fieldDecipher.final('utf8');
	
	if (decodedText === origText)
	{
		matchFound = true;
	}
	
	return matchFound;
}


module.exports = encodeFieldString;