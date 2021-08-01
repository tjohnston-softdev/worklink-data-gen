// Writes error text for encryption tasks.


// Encrypt particular text field.
function writeFieldEncryptionErrorText(vAccountID, vColumn)
{
	var writeRes = "";
	
	writeRes += "Error encrypting ";
	writeRes += addColumn(vColumn);
	writeRes += " - Strings do not match.";
	writeRes += addAccountID(vAccountID);
	
	return writeRes;
}


// Hash password.
function writePasswordEncryptionErrorText(vAccountID, vContext)
{
	var writeRes = "";
	
	writeRes += "Error encrypting ";
	writeRes += addColumn("passwordString");
	writeRes += " - ";
	writeRes += vContext;
	writeRes += addAccountID(vAccountID);
	
	return writeRes;
}


// Adds column name to error text.
function addColumn(cName)
{
	var addRes = "SupportWorker(" + cName + ")";
	return addRes;
}


// Adds account ID to error text.
function addAccountID(idNum)
{
	var addRes = " (ID: " + idNum + ")";
	return addRes;
}


module.exports =
{
	writeFieldEncryption: writeFieldEncryptionErrorText,
	writePasswordEncryption: writePasswordEncryptionErrorText
};