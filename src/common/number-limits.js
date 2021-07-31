// Defines valid number limits.

function defineNumberLimits()
{
	var defineRes = {};
	
	// Ranges.
	defineRes["supportWorkers"] = setRange(1, 10000);
	defineRes["viewsPerDay"] = setRange(0, 10000000);
	defineRes["listEntries"] = setRange(1, 50);
	defineRes["age"] = setRange(0, 1000);
	defineRes["feelsLikeOffset"] = setRange(0, 10);
	defineRes["aboutQuotes"] = setRange(1, 10);
	defineRes["jobMonths"] = setRange(1, 1200);
	defineRes["hours"] = setRange(1, 168);
	defineRes["keywords"] = setRange(1, 500);
	
	// Max lengths.
	defineRes["encryptionLength"] = 128;
	defineRes["nameLength"] = 20;
	defineRes["accentLength"] = 20;
	defineRes["dataLength"] = 150;
	
	return defineRes;
}


function setRange(lowerLimit, upperLimit)
{
	var defineRes = {"minValue": lowerLimit, "maxValue": upperLimit};
	return defineRes;
}


module.exports = defineNumberLimits();