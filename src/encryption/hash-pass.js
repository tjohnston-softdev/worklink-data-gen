const bcrypt = require("bcrypt");
const encryptionErrorText = require("../common/encryption-error-text");
const passInd = 7;


function hashPasswordString(compareStrings, accountObject, hashCallback)
{
	var saltMsg = "";
	
	bcrypt.genSalt(10, function (saltErr, saltRes)
	{
		if (saltErr !== undefined)
		{
			saltMsg = encryptionErrorText.writePasswordEncryption(accountObject[0], "Could not generate salt value.");
			return hashCallback(new Error(saltMsg), null);
		}
		else
		{
			convertString(compareStrings, accountObject, saltRes, hashCallback);
		}
	});
}


function convertString(compStrs, accountObj, saltValue, conversionCallback)
{
	var originalText = accountObj[passInd];
	var hashMsg = "";
	
	bcrypt.hash(originalText, saltValue, function (convErr, convRes)
	{	
		if (convErr !== undefined)
		{
			hashMsg = encryptionErrorText.writePasswordEncryption(accountObj[0], "Could not successfully hash string.");
			return conversionCallback(new Error(hashMsg), null);
		}
		else if (compStrs === true)
		{
			checkHashSuccessful(accountObj, convRes, conversionCallback);
		}
		else
		{
			accountObj[passInd] = convRes;
			return conversionCallback(null, true);
		}
	});
}


function checkHashSuccessful(accObject, hashText, checkCallback)
{
	var origText = accObject[passInd];
	var compMsg = "";
	
	bcrypt.compare(origText, hashText, function (compErr, compRes)
	{
		if (compErr !== null)
		{
			return checkCallback(compErr, null);
		}
		else if (compRes === true)
		{
			accObject[passInd] = hashText;
			return checkCallback(null, true);
		}
		else
		{
			compMsg = encryptionErrorText.writePasswordEncryption(accObject[0], "Hash does not match original string.");
			return checkCallback(new Error(compMsg), null);
		}
	});
}


module.exports = hashPasswordString;