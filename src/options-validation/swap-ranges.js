function swapRangeProperties(optionsObject)
{
	handleCurrentRange(optionsObject, "age", "min", "max");
	handleCurrentRange(optionsObject, "skillDescription", "minKeywords", "maxKeywords");
	handleCurrentRange(optionsObject, "apperanceDescription", "minKeywords", "maxKeywords");
	handleCurrentRange(optionsObject, "travelTime", "min", "max");
	handleCurrentRange(optionsObject, "viewsPerDay", "min", "max");
	handleCurrentRange(optionsObject, "otherLanguages", "min", "max");
	handleCurrentRange(optionsObject, "checksClearances", "min", "max");
	handleCurrentRange(optionsObject, "personality", "min", "max");
	handleCurrentRange(optionsObject, "hobbies", "min", "max");
	handleCurrentRange(optionsObject, "gaming", "min", "max");
	handleCurrentRange(optionsObject, "allergies", "min", "max");
	handleCurrentRange(optionsObject, "fearsPhobias", "min", "max");
	handleCurrentRange(optionsObject, "technology", "min", "max");
	handleCurrentRange(optionsObject, "qualifications", "min", "max");
	handleCurrentRange(optionsObject, "experienceAreas", "min", "max");
	handleCurrentRange(optionsObject, "pets", "minAnimals", "maxAnimals");
	handleCurrentRange(optionsObject, "pets", "minCount", "maxCount");
	handleCurrentRange(optionsObject, "previousExperience", "minPositions", "maxPositions");
	handleCurrentRange(optionsObject, "previousExperience", "minLengthMonths", "maxLengthMonths");
	handleCurrentRange(optionsObject, "availability", "minWeeklyHours", "maxWeeklyHours");
	handleCurrentRange(optionsObject, "availability", "minBlockHours", "maxBlockHours");
	handleCurrentRange(optionsObject, "otherSpecific", "minKeywords", "maxKeywords");
	handleCurrentRange(optionsObject, "otherGeneral", "minKeywords", "maxKeywords");
}


function handleCurrentRange(optsObj, parentName, minName, maxName)
{
	var childObject = optsObj[parentName];
	var swapTemp = -1;
	
	if (childObject[minName] > childObject[maxName] || childObject[maxName] < childObject[minName])
	{
		swapTemp = childObject[minName];
		childObject[minName] = childObject[maxName];
		childObject[maxName] = swapTemp;
	}
}


module.exports = swapRangeProperties;