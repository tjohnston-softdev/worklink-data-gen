// Backs up plain-text sensitive data before it is encrypted.

function backupPlainText(accountArray)
{
	var accountIndex = 0;
	var currentAccount = [];
	var currentPrepared = {};
	
	var backupRes = [];
	
	for (accountIndex = 0; accountIndex < accountArray.length; accountIndex = accountIndex + 1)
	{
		currentAccount = accountArray[accountIndex];
		currentPrepared = {};
		
		// Back up current Support Worker account.
		currentPrepared["id"] = currentAccount[0];
		currentPrepared["email"] = currentAccount[1];
		currentPrepared["password"] = currentAccount[7];
		currentPrepared["driversLicense" ]= currentAccount[2];
		currentPrepared["phone"] = currentAccount[3];
		
		backupRes.push(currentPrepared);
	}
	
	return backupRes;
}


module.exports = backupPlainText;