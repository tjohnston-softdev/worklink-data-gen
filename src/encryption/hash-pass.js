// Hashes password string.

const bcrypt = require("bcrypt");
const encryptionErrors = require("../common/encryption-errors");
const passInd = 7;


// Main function.
function hashPasswordString(compareStrings, accountObject, hashCallback)
{
	var saltMsg = "";
	
	// Generate salt value.
	bcrypt.genSalt(10, function (saltErr, saltRes)
	{
		if (saltErr !== undefined)
		{
			// Error generating salt.
			saltMsg = encryptionErrors.writePasswordEncryption(accountObject[0], "Could not generate salt value.");
			return hashCallback(new Error(saltMsg), null);
		}
		else
		{
			// Perform hashing.
			convertString(compareStrings, accountObject, saltRes, hashCallback);
		}
	});
}


// Converts password string to hash value.
function convertString(compStrs, accountObj, saltValue, conversionCallback)
{
	var originalText = accountObj[passInd];
	var hashMsg = "";
	
	bcrypt.hash(originalText, saltValue, function (convErr, convRes)
	{	
		if (convErr !== undefined)
		{
			// Error hashing password.
			hashMsg = encryptionErrors.writePasswordEncryption(accountObj[0], "Could not successfully hash string.");
			return conversionCallback(new Error(hashMsg), null);
		}
		else if (compStrs === true)
		{
			// Check if original text matches hash.
			checkHashSuccessful(accountObj, convRes, conversionCallback);
		}
		else
		{
			// Skip comparison and save hashed password.
			accountObj[passInd] = convRes;
			return conversionCallback(null, true);
		}
	});
}


// Checks if the original string matches the hashed value.
function checkHashSuccessful(accObject, hashText, checkCallback)
{
	var origText = accObject[passInd];
	var compMsg = "";
	
	bcrypt.compare(origText, hashText, function (compErr, compRes)
	{
		if (compErr !== null)
		{
			// Error comparing values.
			compMsg = encryptionErrors.writePasswordEncryption(accObject[0], "Could not successfully compare results.");
			return checkCallback(new Error(compMsg), null);
		}
		else if (compRes === true)
		{
			// Values match - Save hashed password.
			accObject[passInd] = hashText;
			return checkCallback(null, true);
		}
		else
		{
			// Values do not match.
			compMsg = encryptionErrors.writePasswordEncryption(accObject[0], "Hash does not match original string.");
			return checkCallback(new Error(compMsg), null);
		}
	});
}


module.exports = hashPasswordString;