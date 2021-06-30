/*
	Adds separator text between keywords when writing descriptions.
	Applied after the previous, before the next.
	First keyword is ignored.
*/

function addSeparatorString(addFlag, sepTxt)
{
	var addRes = "";
	
	if (addFlag > 0)
	{
		addRes = sepTxt;
	}
	
	return addRes;
}


module.exports = addSeparatorString;