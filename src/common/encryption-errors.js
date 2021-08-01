function writeFieldEncryptionErrorText(vAccountID, vColumn)
{
	var writeRes = "";
	
	writeRes += "Error encrypting ";
	writeRes += addColumn(vColumn);
	writeRes += " - Strings do not match.";
	writeRes += addAccountID(vAccountID);
	
	return writeRes;
}


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


function addColumn(cName)
{
	var addRes = "SupportWorker(" + cName + ")";
	return addRes;
}


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