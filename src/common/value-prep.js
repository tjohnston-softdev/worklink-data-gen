const capitalLetters = /[A-Z]/g;
const spaceChars = /\s+/g;

function castDataLineString(origVal)
{
	var givenType = typeof origVal;
	var castRes = "";
	
	if (givenType === "string")
	{
		castRes = origVal;
	}
	
	return castRes;
}


function removeExcessStringSpace(subjectString)
{
	var removeRes = "";
	
	removeRes = subjectString.trim();
	removeRes = removeRes.replace(spaceChars, " ");
	
	return removeRes;
}



module.exports =
{
	castDataLine: castDataLineString,
	removeExcessSpace: removeExcessStringSpace
};