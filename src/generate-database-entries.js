const ora = require("ora");
const rowCounts = require("./common/row-counts");
const genData = require("./generation/gen-data");
const personGender = require("./generation/person-gender");
const personFirstName = require("./generation/person-first_name");
const personDateTime = require("./generation/person-datetime");
const personSensitive = require("./generation/person-sensitive");
const personInt = require("./generation/person-int");
const personVideo = require("./generation/person-video");
const writtenDescriptions = require("./generation/written-descriptions");
const foreignKeyLists = require("./generation/foreign-key-lists");
const availRoster = require("./generation/avail-roster");
const prevExperience = require("./generation/prev-experience");
const otherGeneralDescription = require("./generation/other-general-description");


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
	var generationResultObject = genData.defineResult();
	
	var loopNumber = 1;
	var currentBase = {};
	
	for (loopNumber = 1; loopNumber <= 10; loopNumber = loopNumber + 1)
	{
		currentBase = prepareBaseData(genOptsObj, keywordsObj.firstNames);
		generateAccount(genOptsObj, loopNumber, currentBase, keywordsObj, generationResultObject);
		foreignKeyLists.generateEntries(genOptsObj, loopNumber, generationResultObject);
		availRoster.generateAvailability(genOptsObj.availability, loopNumber, generationResultObject);
		prevExperience.generateExperience(genOptsObj.previousExperience, currentBase, loopNumber, keywordsObj, generationResultObject);
		generateOther(genOptsObj, loopNumber, keywordsObj, generationResultObject);
	}
	
	return genCallback(generationResultObject);
}


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


function generateAccount(genOpts, accountID, baseObject, kwordsObj, genResObj)
{
	var accountObject = [accountID];
	
	personSensitive.writeEmailAddress(baseObject.name, accountID, accountObject);
	personSensitive.chooseDriversLicenseNumber(accountObject, genResObj.baseEntries);
	personSensitive.choosePhoneNumber(accountObject, genResObj.baseEntries);
	accountObject.push(baseObject.name, baseObject.gender);
	personDateTime.addRegister(baseObject.register, accountObject);
	personSensitive.choosePassword(genOpts.userPassword, accountObject);
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
	
	genResObj.baseEntries.push(accountObject);
}


function generateOther(genOpts, accountID, kwordsObj, genResObj)
{
	var otherObject = [accountID];
	
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
	
	genResObj.other.push(otherObject);
}



module.exports = performDatabaseEntryGeneration;