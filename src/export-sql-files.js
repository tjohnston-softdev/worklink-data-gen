const series = require("run-series");
const ora = require("ora");
const storedPaths = require("../storage-paths");
const fileDest = require("./output/file-dest");
const fileWrite = require("./output/file-write");


function performSqlExport(genData, sqlExportCallback)
{
	var exportSpinner = ora("Exporting Data").start();
	
	series(
	[
		fileDest.prepareFolder.bind(null, storedPaths.outputFolder),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "01-support_worker.sql", "SupportWorker", genData.baseEntries),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "02-other_languages.sql", "SupportWorkerOtherLanguages", genData.otherLanguages),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "03-checks_clearances.sql", "SupportWorkerChecks", genData.checks),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "04-personality.sql", "SupportWorkerPersonality", genData.personality),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "05-hobbies.sql", "SupportWorkerHobbies", genData.hobbies),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "06-gaming.sql", "SupportWorkerGaming", genData.gaming),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "07-availability.sql", "SupportWorkerAvaliability", genData.avaliability),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "08-allergies.sql", "SupportWorkerAllergies", genData.allergies),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "09-pets.sql", "SupportWorkerPets", genData.pets),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "10-fears.sql", "SupportWorkerFears", genData.fears),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "11-technology.sql", "SupportWorkerTechnology", genData.technology),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "12-qualifications.sql", "SupportWorkerQualifications", genData.qualifications),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "13-experience_areas.sql", "SupportWorkerExperienceAreas", genData.experienceAreas),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "14-previous_experience.sql", "SupportWorkerPreviousExperience", genData.previousExperience),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "15-other.sql", "SupportWorkerOther", genData.other)
	],
	function (overallErr, overallRes)
	{
		if (overallErr !== null)
		{
			exportSpinner.fail("Error exporting data");
			return sqlExportCallback(overallErr, null);
		}
		else
		{
			exportSpinner.succeed("Data exported");
			return sqlExportCallback(null, true);
		}
	});
}



module.exports = performSqlExport;