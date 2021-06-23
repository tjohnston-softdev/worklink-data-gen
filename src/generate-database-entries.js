const ora = require("ora");
const genData = require("./generation/gen-data");
const personGender = require("./generation/person-gender");
const personFirstName = require("./generation/person-first_name");


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
	var currentName = "Placeholder";
	var currentRegister = "";
	var currentDOB = "";
	var currentChronoAge = -1;
	var currentFeelsAge = -1;
	
	for (loopNumber = 1; loopNumber <= 10; loopNumber = loopNumber + 1)
	{
		currentGender = personGender.chooseRandom(genOptsObj.genders);
		//currentName = personFirstName.chooseRandom(keywordsObj.firstNames, currentGender);
	}
	
	
	return genCallback(generationResultObject);
}



module.exports = performDatabaseEntryGeneration;