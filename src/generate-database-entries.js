const ora = require("ora");
const rowCounts = require("./common/row-counts");
const genData = require("./generation/gen-data");
const personGender = require("./generation/person-gender");
const personFirstName = require("./generation/person-first_name");
const personDateTime = require("./generation/person-datetime");
const personSensitive = require("./generation/person-sensitive");
const personInt = require("./generation/person-int");


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
	var currentRegister = null;
	var currentDOB = null;
	var currentChronoAge = -1;
	var currentFeelsAge = -1;
	var currentParent = [];
	
	console.log("");
	console.log("");
	
	for (loopNumber = 1; loopNumber <= 10; loopNumber = loopNumber + 1)
	{
		currentGender = personGender.chooseRandom(genOptsObj.genders);
		//currentName = personFirstName.chooseRandom(keywordsObj.firstNames, currentGender);
		currentRegister = personDateTime.chooseRegister(genOptsObj.minRegDate);
		
		currentDOB = personDateTime.chooseDOB(currentRegister, genOptsObj.age);
		currentChronoAge = personDateTime.calculateAge(currentDOB);
		currentFeelsAge = personDateTime.chooseFeelsLikeAge(currentChronoAge, genOptsObj.age);
		currentParent = [loopNumber];
		
		personSensitive.writeEmailAddress(currentName, loopNumber, currentParent);
		personSensitive.chooseDriversLicenseNumber(currentParent, generationResultObject.baseEntries);
		personSensitive.choosePhoneNumber(currentParent, generationResultObject.baseEntries);
		currentParent.push(currentName, currentGender);
		personDateTime.addRegister(currentRegister, currentParent);
		personSensitive.choosePassword(genOptsObj.userPassword, currentParent);
		personDateTime.addDOB(currentDOB, currentParent);
		currentParent.push(currentFeelsAge);
		personInt.chooseID(rowCounts.locations, currentParent);
		
		console.log(currentParent);
		
	}
	
	console.log("");
	
	
	return genCallback(generationResultObject);
}



module.exports = performDatabaseEntryGeneration;