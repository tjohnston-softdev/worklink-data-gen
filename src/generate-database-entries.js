// Script generates random data.

const ora = require("ora");
const rowCounts = require("./common/row-counts");
const genData = require("./generation/gen-data");
const personGender = require("./generation/person-gender");
const personFirstName = require("./generation/person-first_name");
const personDateTime = require("./generation/person-datetime");
const personSensitive = require("./generation/person-sensitive");
const personPassword = require("./generation/person-password");
const personInt = require("./generation/person-int");
const personVideo = require("./generation/person-video");
const writtenDescriptions = require("./generation/written-descriptions");
const foreignKeyLists = require("./generation/foreign-key-lists");
const availRoster = require("./generation/avail-roster");
const prevExperience = require("./generation/prev-experience");
const otherGeneralDescription = require("./generation/other-general-description");


// Main function.
function performDatabaseEntryGeneration(genOptsObject, keywordsObject, generationCallback)
{
	var genSpinner = ora("Generating entries").start();
	
	coordinateGeneration(genOptsObject, keywordsObject, function(overallResult)
	{
		// Errors are not possible.
		genSpinner.succeed("Entries generated");
		return generationCallback(overallResult);
	});
}



// Data generation loop.
function coordinateGeneration(genOptsObj, keywordsObj, genCallback)
{
	var generationResultObject = genData.defineResult();
	
	var loopNumber = 1;
	var currentBase = {};
	
	for (loopNumber = 1; loopNumber <= genOptsObj.supportWorkerCount; loopNumber = loopNumber + 1)
	{
		// Defines working base data.
		currentBase = prepareBaseData(genOptsObj, keywordsObj.firstNames);
		
		// Generate data rows.
		generateAccount(genOptsObj, loopNumber, currentBase, keywordsObj, generationResultObject);
		foreignKeyLists.generateEntries(genOptsObj, loopNumber, generationResultObject);
		availRoster.generateAvailability(genOptsObj.availability, loopNumber, generationResultObject);
		prevExperience.generateExperience(genOptsObj.previousExperience, currentBase, loopNumber, keywordsObj, generationResultObject);
		generateOther(genOptsObj, loopNumber, keywordsObj, generationResultObject);
	}
	
	
	return genCallback(generationResultObject);
}


// Prepare base working data for current support worker.
function prepareBaseData(genOpts, firstNameList)
{
	var localGender = personGender.chooseRandom(genOpts.genders);
	var localName = personFirstName.chooseRandom(firstNameList, localGender);
	var localReg = personDateTime.chooseRegister(genOpts.minRegDate);
	var localDOB = personDateTime.chooseDOB(localReg, genOpts.age);
	var localChrono = personDateTime.calculateAge(localDOB);
	var basePrepRes = genData.defineBase();
	
	basePrepRes.gender = localGender;
	basePrepRes.name = localName;
	basePrepRes.register = localReg;
	basePrepRes.dateOfBirth = localDOB;
	basePrepRes.chronoAge = localChrono;
	basePrepRes.feelsLikeAge = personDateTime.chooseFeelsLikeAge(localChrono, genOpts.age);
	
	return basePrepRes;
}


// Main account object for support worker.
function generateAccount(genOpts, accountID, baseObject, kwordsObj, genResObj)
{
	var accountObject = [accountID];
	
	// Populate data columns.
	personSensitive.writeEmailAddress(baseObject.name, accountID, accountObject);
	personSensitive.chooseDriversLicenseNumber(accountObject, genResObj.baseEntries);
	personSensitive.choosePhoneNumber(accountObject, genResObj.baseEntries);
	accountObject.push(baseObject.name, baseObject.gender);
	personDateTime.addRegister(baseObject.register, accountObject);
	personPassword.chooseString(accountObject);
	personDateTime.addDOB(baseObject.dateOfBirth, accountObject);
	accountObject.push(baseObject.feelsLikeAge);
	personInt.chooseID(rowCounts.locations, accountObject);
	writtenDescriptions.writeAbout(genOpts.aboutQuotes, kwordsObj.quotes, accountObject);
	writtenDescriptions.writeRequired(genOpts.skillDescription, kwordsObj.ingForms, accountObject);
	writtenDescriptions.writeOptional(genOpts.apperanceDescription, kwordsObj.encouragingWords, accountObject);
	personInt.chooseTravelTime(genOpts.travelTime, accountObject);
	personInt.chooseLanguageFlags(genOpts.baseChances, accountObject);
	writtenDescriptions.writeAccent(kwordsObj.accents, accountObject);
	personInt.chooseID(rowCounts.cultures, accountObject);
	personInt.chooseMiscFlags(genOpts.baseChances, accountObject);
	personInt.chooseID(rowCounts.referralSources, accountObject);
	personInt.chooseWageSubsidyFlag(genOpts.baseChances, accountObject);
	personInt.chooseInterviewDay(accountObject);
	personVideo.chooseID(genOpts.baseChances, accountObject);
	personInt.chooseViews(baseObject.register, genOpts.viewsPerDay, accountObject);
	accountObject.push(1, 1);
	
	// Complete.
	genResObj.baseEntries.push(accountObject);
}

// Other descriptions object.
function generateOther(genOpts, accountID, kwordsObj, genResObj)
{
	var otherObject = [accountID];
	
	// Populate columns.
	writtenDescriptions.writeOptional(genOpts.otherSpecific, kwordsObj.descriptions, otherObject);
	writtenDescriptions.writeOptional(genOpts.otherSpecific, kwordsObj.hobbies, otherObject);
	writtenDescriptions.writeOptional(genOpts.otherSpecific, kwordsObj.games, otherObject);
	writtenDescriptions.writeOptional(genOpts.otherSpecific, kwordsObj.animals, otherObject);
	writtenDescriptions.writeOptional(genOpts.otherSpecific, kwordsObj.allergies, otherObject);
	writtenDescriptions.writeOptional(genOpts.otherSpecific, kwordsObj.monsters, otherObject);
	writtenDescriptions.writeOptional(genOpts.otherSpecific, kwordsObj.technologies, otherObject);
	writtenDescriptions.writeOptional(genOpts.otherSpecific, kwordsObj.academicSubjects, otherObject);
	writtenDescriptions.writeOptional(genOpts.otherSpecific, kwordsObj.industries, otherObject);
	writtenDescriptions.writeOptional(genOpts.otherSpecific, kwordsObj.timeUnits, otherObject);
	otherGeneralDescription.writeString(genOpts.otherGeneral, kwordsObj, otherObject);
	otherObject.push(1);
	
	// Complete.
	genResObj.other.push(otherObject);
}



module.exports = performDatabaseEntryGeneration;