const path = require("path");
const series = require("run-series");
const ora = require("ora");
const storedPaths = require("../storage-paths");
const checkFileExists = require("./input/check-file-exists");
const readLineData = require("./input/read-line-data");
const readFirstNames = require("./input/read-first-names");
const numberLimits = require("./common/number-limits");
const keywordData = require("./common/keyword-data");


function performInputDataRead(dataReadCallback)
{
	var dataSpinner = ora("Reading Input Data").start();
	
	coordinateData(function (overallErr, overallRes)
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


function coordinateData(coordCallback)
{
	var resultObject = keywordData.defineObject();
	
	series(
	[
		/*
		callLineData.bind(null, "academic-subjects.txt", "Academic Subjects", "Subject", numberLimits.dataLength, resultObject, "academicSubjects"),
		callLineData.bind(null, "accents.txt", "Accents", "Accent", numberLimits.accentLength, resultObject, "accents"),
		callLineData.bind(null, "allergies.txt", "Allergies", "Allergy", numberLimits.dataLength, resultObject, "allergies"),
		callLineData.bind(null, "animals.txt", "Animals", "Animal", numberLimits.dataLength, resultObject, "animals"),
		callLineData.bind(null, "descriptions.txt", "Descriptions", "Description Trait", numberLimits.dataLength, resultObject, "descriptions"),
		callLineData.bind(null, "employers.txt", "Employers", "Company Name", numberLimits.dataLength, resultObject, "employers"),
		*/
		callLineData.bind(null, "encouraging-words.txt", "Encouraging Words", "Word", numberLimits.dataLength, resultObject, "encouragingWords"),
		/*
		callNameData.bind(null, "first-names.csv", "First Names", resultObject)
		callLineData.bind(null, "hobbies.txt", "Hobbies", "Hobby", numberLimits.dataLength, resultObject, "hobbies"),
		callLineData.bind(null, "industries.txt", "Industries", "Industry", numberLimits.dataLength, resultObject, "industries"),
		*/
		callLineData.bind(null, "ing-forms.txt", "-ing Forms", "Verb", numberLimits.dataLength, resultObject, "ingForms"),
		//callLineData.bind(null, "monsters.txt", "Monsters", "Monster", numberLimits.dataLength, resultObject, "monsters"),
		//callLineData.bind(null, "occupations.txt", "Occupations", "Occupation", numberLimits.dataLength, resultObject, "occupations"),
		callLineData.bind(null, "quotes.txt", "Quotes", "Quote", numberLimits.dataLength, resultObject, "quotes")
		//callLineData.bind(null, "technology.txt", "Technology", "Technology", numberLimits.dataLength, resultObject, "technologies"),
		//callLineData.bind(null, "video-games.txt", "Video Games", "Game", numberLimits.dataLength, resultObject, "games")
	],
	function (batchErr, batchRes)
	{
		if (batchErr !== null)
		{
			return coordCallback(batchErr, null);
		}
		else
		{
			return coordCallback(null, resultObject);
		}
	});
	
}


function callLineData(dataFileName, dataFileDesc, fieldName, fieldLength, resultObj, resultProp, lineCallback)
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
			resultObj[resultProp] = lineRes[1];
			return lineCallback(null, true);
		}
	});
}


function callNameData(dataFileName, dataFileDesc, resultObj, nameCallback)
{
	var dataFilePath = getFilePath(dataFileName);
	
	series(
	[
		checkFileExists.checkInput.bind(null, dataFilePath, dataFileDesc),
		readFirstNames.readCsv.bind(null, dataFilePath, dataFileDesc)
	],
	function (nameErr, nameRes)
	{
		if (nameErr !== null)
		{
			return nameCallback(nameErr, null);
		}
		else
		{
			resultObj.firstNames = nameRes[1];
			return nameCallback(null, true);
		}
	});
}


function getFilePath(fileName)
{
	var pathRes = path.join(storedPaths.inputFolder, fileName);
	return pathRes;
}



module.exports = performInputDataRead;