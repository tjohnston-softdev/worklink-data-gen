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

function neutralizeStringCasing(subjectString)
{
	var capitalIndex = 0;
	var capitalList = subjectString.match(capitalLetters);
	var currentCapital = "";
	var currentIndex = -1;
	
	var stringPos = 0;
	var neutralRes = {};
	
	neutralRes["lowerString"] = "";
	neutralRes["capArray"] = [];
	
	for (capitalIndex = 0; capitalIndex < capitalList.length; capitalIndex = capitalIndex + 1)
	{
		currentCapital = capitalList[capitalIndex];
		currentIndex = subjectString.indexOf(currentCapital, stringPos);
		
		if (currentIndex >= 0 && currentIndex < subjectString.length)
		{
			neutralRes.capArray.push(currentIndex);
			stringPos = currentIndex + 1;
		}
	}
	
	neutralRes.lowerString = subjectString.toLowerCase();
	
	return neutralRes;
}



module.exports =
{
	castDataLine: castDataLineString,
	removeExcessSpace: removeExcessStringSpace,
	neutralizeCase: neutralizeStringCasing
};