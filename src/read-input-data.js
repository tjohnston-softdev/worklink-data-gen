const path = require("path");
const series = require("run-series");
const ora = require("ora");
const storedPaths = require("../storage-paths");
const checkFileExists = require("./input/check-file-exists");
const readLineData = require("./input/read-line-data");
const readFirstNames = require("./input/read-first-names");
const numberLimits = require("./common/number-limits");


function performInputDataRead(dataReadCallback)
{
	var dataSpinner = ora("Reading Input Data").start();
	
	series(
	[
		callLineData.bind(null, "academic-subjects.txt", "Academic Subjects", "Subject", numberLimits.dataLength)
		//"accents": callLineData.bind(null, "accents.txt", "Accents", "Accent", numberLimits.accentLength),
		//"allergies": callLineData.bind(null, "allergies.txt", "Allergies", "Allergy", numberLimits.dataLength),
		//"animals": callLineData.bind(null, "animals.txt", "Animals", "Animal", numberLimits.dataLength),
		//"descriptions": callLineData.bind(null, "descriptions.txt", "Descriptions", "Description Trait", numberLimits.dataLength),
		//"employers": callLineData.bind(null, "employers.txt", "Employers", "Company Name", numberLimits.dataLength),
		//"encouragingWords": callLineData.bind(null, "encouraging-words.txt", "Encouraging Words", "Word", numberLimits.dataLength),
		//"firstNames": callNameData.bind(null, "first-names.csv", "First Names"),
		//"hobbies": callLineData.bind(null, "hobbies.txt", "Hobbies", "Hobby", numberLimits.dataLength),
		//"industries": callLineData.bind(null, "industries.txt", "Industries", "Industry", numberLimits.dataLength),
		//"ingForms": callLineData.bind(null, "ing-forms.txt", "-ing Forms", "Verb", numberLimits.dataLength),
		//"monsters": callLineData.bind(null, "monsters.txt", "Monsters", "Monster", numberLimits.dataLength),
		//"occupations": callLineData.bind(null, "occupations.txt", "Occupations", "Occupation", numberLimits.dataLength),
		//"quotes": callLineData.bind(null, "quotes.txt", "Quotes", "Quote", numberLimits.dataLength),
		//"technologies": callLineData.bind(null, "technology.txt", "Technology", "Technology", numberLimits.dataLength),
		//"games": callLineData.bind(null, "video-games.txt", "Video Games", "Game", numberLimits.dataLength)
	],
	function (overallErr, overallRes)
	{
		if (overallErr !== null)
		{
			dataSpinner.fail("Error reading input data");
			return dataReadCallback(overallErr, null);
		}
		else
		{
			dataSpinner.succeed("Input data read successfully");
			return dataReadCallback(null, overallRes);
		}
	});
}


function callLineData(dataFileName, dataFileDesc, fieldName, fieldLength, lineCallback)
{
	var dataFilePath = getFilePath(dataFileName);
	
	series(
	[
		checkFileExists.checkInput.bind(null, dataFilePath, dataFileDesc),
		readLineData.readFile.bind(null, dataFilePath, dataFileDesc, fieldName, fieldLength)
	],
	function (lineErr, lineRes)
	{
		if (lineErr !== null)
		{
			return lineCallback(lineErr, null);
		}
		else
		{
			return lineCallback(null, lineRes[1].length);
		}
	});
}


function callNameData(dataFileName, dataFileDesc, nameCallback)
{
	var dataFilePath = getFilePath(dataFileName);
	
	series(
	{
		"fileSafe": checkFileExists.checkInput.bind(null, dataFilePath, dataFileDesc),
		"retrievedEntries": readFirstNames.readCsv.bind(null, dataFilePath, dataFileDesc)
	},
	function (nameErr, nameRes)
	{
		if (nameErr !== null)
		{
			return nameCallback(nameErr, null);
		}
		else
		{
			return nameCallback(null, nameRes.retrievedEntries);
		}
	});
}


function getFilePath(fileName)
{
	var pathRes = path.join(storedPaths.inputFolder, fileName);
	return pathRes;
}



module.exports = performInputDataRead;