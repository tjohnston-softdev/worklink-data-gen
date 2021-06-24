const ora = require("ora");
const rowCounts = require("./common/row-counts");
const genData = require("./generation/gen-data");
const personGender = require("./generation/person-gender");
const personFirstName = require("./generation/person-first_name");
const personDateTime = require("./generation/person-datetime");
const personSensitive = require("./generation/person-sensitive");
const personInt = require("./generation/person-int");
const writtenDescriptions = require("./generation/written-descriptions");


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
	var currentAccount = [];
	
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
		currentAccount = [loopNumber];
		
		personSensitive.writeEmailAddress(currentName, loopNumber, currentAccount);
		personSensitive.chooseDriversLicenseNumber(currentAccount, generationResultObject.baseEntries);
		personSensitive.choosePhoneNumber(currentAccount, generationResultObject.baseEntries);
		currentAccount.push(currentName, currentGender);
		personDateTime.addRegister(currentRegister, currentAccount);
		personSensitive.choosePassword(genOptsObj.userPassword, currentAccount);
		personDateTime.addDOB(currentDOB, currentAccount);
		currentAccount.push(currentFeelsAge);
		personInt.chooseID(rowCounts.locations, currentAccount);
		writtenDescriptions.writeAbout(genOptsObj.aboutQuotes, keywordsObj.quotes, currentAccount);
		writtenDescriptions.writeRequired(genOptsObj.skillDescription, keywordsObj.ingForms, currentAccount);
		writtenDescriptions.writeOptional(genOptsObj.apperanceDescription, keywordsObj.encouragingWords, currentAccount);
		personInt.chooseTravelTime(genOptsObj.travelTime, currentAccount);
		personInt.chooseLanguageFlags(genOptsObj.baseChances, currentAccount);
		writtenDescriptions.writeAccent(keywordsObj.accents, currentAccount);
		personInt.chooseID(rowCounts.cultures, currentAccount);
		personInt.chooseMiscFlags(genOptsObj.baseChances, currentAccount);
		
		console.log(currentAccount);
	}
	
	console.log("");
	return genCallback(generationResultObject);
}



module.exports = performDatabaseEntryGeneration;