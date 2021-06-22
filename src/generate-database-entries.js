const ora = require("ora");
const genData = require("./generation/gen-data");


function performDatabaseEntryGeneration(genOptsObject, keywordsObject, generationCallback)
{
	var genSpinner = ora("Generating Entries").start();
	
	coordinateGeneration(genOptsObject, keywordsObject, function(overallResult)
	{
		genSpinner.succeed("Entries generated");
		return generationCallback(overallResult);
	});
}



function coordinateGeneration(genOptsObj, keywordsObj, genCallback)
{
	var generationResultObject = genData.defineObject();
	
	var loopNumber = 1;
	var currentGender = null;
	var currentName = "";
	var currentRegister = "";
	var currentDOB = "";
	var currentChronoAge = -1;
	var currentFeelsAge = -1;
	
	for (loopNumber = 1; loopNumber <= genOptsObj.supportWorkerCount; loopNumber = loopNumber + 1)
	{
		currentGender = null;
	}
	
	
	return genCallback(generationResultObject);
}



module.exports = performDatabaseEntryGeneration;