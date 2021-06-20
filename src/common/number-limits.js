function defineNumberLimits()
{
	var defineRes = {};
	
	defineRes["supportWorkers"] = setRange(1, 1000000);
	defineRes["viewsPerDay"] = setRange(0, 10000000);
	defineRes["listEntries"] = setRange(1, 50);
	defineRes["age"] = setRange(0, 1000);
	defineRes["feelsLikeOffset"] = setRange(0, 10);
	defineRes["jobMonths"] = setRange(1, 1200);
	defineRes["hours"] = setRange(1, 168);
	defineRes["keywords"] = setRange(1, 500);
	
	return defineRes;
}

function setRange(lowerLimit, upperLimit)
{
	var defineRes = {"minValue": lowerLimit, "maxValue": upperLimit};
	return defineRes;
}


module.exports = defineNumberLimits();