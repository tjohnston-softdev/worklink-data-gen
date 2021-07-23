// Generates rows for many-to-many tables.

const randomTasks = require("../common/random-tasks");
const rowCounts = require("../common/row-counts");
const experienceFormat = require("../common/experience-format");


// Main function.
function generateListEntries(genOpts, accountNumber, genResObj)
{
	mapOptional(genOpts.otherLanguages, accountNumber, genResObj, "otherLanguages", rowCounts.languages);
	mapChecksClearances(genOpts.checksClearances, accountNumber, genResObj);
	mapRequired(genOpts.personality, accountNumber, genResObj, "personality", rowCounts.personalityTraits);
	mapRequired(genOpts.hobbies, accountNumber, genResObj, "hobbies", rowCounts.hobbies);
	mapOptional(genOpts.gaming, accountNumber, genResObj, "gaming", rowCounts.gaming);
	mapOptional(genOpts.allergies, accountNumber, genResObj, "allergies", rowCounts.allergies);
	mapOptional(genOpts.fearsPhobias, accountNumber, genResObj, "fears", rowCounts.fears);
	mapRequired(genOpts.technology, accountNumber, genResObj, "technology", rowCounts.technology);
	mapOptional(genOpts.qualifications, accountNumber, genResObj, "qualifications", rowCounts.qualifications);
	mapExperienceAreas(genOpts.experienceAreas, accountNumber, genResObj);
	mapPets(genOpts.pets, accountNumber, genResObj);
}


// Required.
function mapRequired(mapOpts, accountNum, genRes, tblProp, tblMaxID)
{
	var chosenRowCount = randomTasks.rollInteger(mapOpts.min, mapOpts.max);
	var keySequence = chooseKeys(chosenRowCount, tblMaxID);
	insertGeneral(genRes, tblProp, accountNum, keySequence);
}


// Optional.
function mapOptional(mapOpts, accountNum, genRes, tblProp, tblMaxID)
{
	var canGenerate = randomTasks.rollPercent(mapOpts.chance);
	var chosenRowCount = -1;
	var keySequence = [];
	
	if (canGenerate === true)
	{
		chosenRowCount = randomTasks.rollInteger(mapOpts.min, mapOpts.max);
		keySequence = chooseKeys(chosenRowCount, tblMaxID);
		insertGeneral(genRes, tblProp, accountNum, keySequence);
	}
}


// Checks and clearances, can be optional.
function mapChecksClearances(mapOpts, accountNum, genRes)
{
	var canGenerate = randomTasks.rollPercent(mapOpts.chance);
	var chosenRowCount = -1;
	var keySequence = [];
	
	if (canGenerate === true)
	{
		// Choose options as normal.
		chosenRowCount = randomTasks.rollInteger(mapOpts.min, mapOpts.max);
		keySequence = chooseKeys(chosenRowCount, rowCounts.checks);
	}
	else if (mapOpts.showWillingness === true)
	{
		// Choose 'Willing to obtain' option.
		keySequence = [1];
	}
	else
	{
		// Skip.
		keySequence = [];
	}
	
	// Call insert.
	insertGeneral(genRes, "checks", accountNum, keySequence);
}


// Experience areas, required.
function mapExperienceAreas(mapOpts, accountNum, genRes)
{
	var chosenRowCount = randomTasks.rollInteger(mapOpts.min, mapOpts.max);
	var keySequence = chooseKeys(chosenRowCount, rowCounts.experienceAreas);
	insertExperienceAreas(genRes, accountNum, keySequence);
}


// Pets, optional.
function mapPets(mapOpts, accountNum, genRes)
{
	var canGenerate = randomTasks.rollPercent(mapOpts.chance);
	var chosenRowCount = -1;
	var keySequence = [];
	
	if (canGenerate === true)
	{
		chosenRowCount = randomTasks.rollInteger(mapOpts.minAnimals, mapOpts.maxAnimals);
		keySequence = chooseKeys(chosenRowCount, rowCounts.pets);
		insertPets(mapOpts, genRes, accountNum, keySequence);
	}
}

// Choose selected options for support worker.
function chooseKeys(chosenAmount, maxID)
{
	var targetLength = Math.min(chosenAmount, maxID);
	var currentID = -1;
	var currentUsed = false;
	var choiceRes = [];
	
	while (choiceRes.length < targetLength)
	{
		// Choose current ID.
		currentID = randomTasks.rollInteger(1, maxID);
		currentUsed = choiceRes.includes(currentID);
		
		if (currentUsed !== true)
		{
			// Add to result.
			choiceRes.push(currentID);
		}
	}
	
	return choiceRes;
}


// Insert general many-to-many rows.
function insertGeneral(resultData, tProp, accNum, keySeq)
{
	var insertIndex = 0;
	var currentKey = -1;
	var currentRow = [];
	
	for (insertIndex = 0; insertIndex < keySeq.length; insertIndex = insertIndex + 1)
	{
		currentKey = keySeq[insertIndex];
		currentRow = [accNum, currentKey, 1];
		resultData[tProp].push(currentRow);
	}
}


// Insert 'SupportWorkerExperienceAreas' rows.
function insertExperienceAreas(resultData, accNum, keySeq)
{
	var insertIndex = 0;
	var currentKey = -1;
	var currentExperienceLevel = -1;
	var currentExperienceDesc = "";
	var currentRow = [];
	
	for (insertIndex = 0; insertIndex < keySeq.length; insertIndex = insertIndex + 1)
	{
		// Read current FK.
		currentKey = keySeq[insertIndex];
		
		// Write description.
		currentExperienceLevel = randomTasks.rollInteger(1, 100);
		currentExperienceDesc = experienceFormat.getDescription(currentExperienceLevel);
		
		
		// Add row object.
		currentRow = [accNum, currentKey, currentExperienceDesc, 1];
		resultData.experienceAreas.push(currentRow);
	}
}


// Insert 'SupportWorkerPets' rows.
function insertPets(countOpts, resultData, accNum, keySeq)
{
	var insertIndex = 0;
	var currentKey = -1;
	var currentCount = -1;
	var currentRow = [];
	
	for (insertIndex = 0; insertIndex < keySeq.length; insertIndex = insertIndex + 1)
	{
		currentKey = keySeq[insertIndex];
		currentCount = randomTasks.rollInteger(countOpts.minCount, countOpts.maxCount);
		currentRow = [accNum, currentKey, currentCount, 1];
		resultData.pets.push(currentRow);
	}
}



module.exports =
{
	generateEntries: generateListEntries
};