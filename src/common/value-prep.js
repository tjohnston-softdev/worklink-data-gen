// Functions for string preperation.


const spaceChars = /\s+/g;					// RegExp for whitespace.


// Cast value to string.
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


// Trim leading whitespace.
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