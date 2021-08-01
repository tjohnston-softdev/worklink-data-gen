// Encrypts plain string and compares result to original.

const cryptoModule = require("crypto");
const encryptionErrors = require("../common/encryption-errors");
const encMethod = "aes-128-cbc";


// Main function.
function encodeFieldString(encOpts, accountObject, fieldIndex, colName, encryptionCallback)
{
	var originalText = accountObject[fieldIndex];
	var fieldCipher = cryptoModule.createCipher(encMethod, encOpts.key);
	var encodedText = "";
	
	var encryptionSuccessful = false;
	var flaggedMessage = "";
	
	// Perform encryption.
	encodedText += fieldCipher.update(originalText, 'utf8', 'hex');
	encodedText += fieldCipher.final('hex');
	
	
	if (encOpts.checkMatch === true)
	{
		// Check if decrypted string matches original.
		encryptionSuccessful = handleComparison(encOpts.key, encodedText, originalText);
	}
	else
	{
		// Skip comparison.
		encryptionSuccessful = true;
	}
	
	
	if (encryptionSuccessful === true)
	{
		// Save encrypted string.
		accountObject[fieldIndex] = encodedText;
		return encryptionCallback(null, true);
	}
	else
	{
		// Comparison error.
		flaggedMessage = encryptionErrors.writeFieldEncryption(accountObject[0], colName);
		return encryptionCallback(new Error(flaggedMessage), null);
	}
	
}


// Checks whether decrypted string matches original.
function handleComparison(encKey, encText, origText)
{
	var fieldDecipher = cryptoModule.createDecipher(encMethod, encKey);
	var decodedText = "";
	var matchFound = false;
	
	// Perform decryption.
	decodedText += fieldDecipher.update(encText, 'hex', 'utf8');
	decodedText += fieldDecipher.final('utf8');
	
	
	if (decodedText === origText)
	{
		// Success.
		matchFound = true;
	}
	
	return matchFound;
}


module.exports = encodeFieldString;