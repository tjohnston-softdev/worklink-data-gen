const fs = require("fs");
const lineByLine = require("line-by-line");
const fsErrors = require("../common/fs-errors");
const lineStreamResult = require("../common/line-stream-result");
const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");
const valuePrep = require("../common/value-prep");
const nameGender = require("../common/name-gender");

readCsvFile("../../input-data/first-names.csv", "First Names", function(testErr, testRes)
{
	if (testErr !== null)
	{
		console.log(testErr.message);
	}
	else
	{
		console.log(testRes);
	}
});


function readCsvFile(nameTargetFilePath, nameInputFileDesc, fileCallback)
{
	var namesFileResult = lineStreamResult.initializeObject();
	var canContinue = true;
	var lineStream = new lineByLine(nameTargetFilePath);
	
	lineStream.on("error", function(readErr)
	{
		canContinue = false;
		namesFileResult.successful = false;
		namesFileResult.messageText = fsErrors.writeFileRead(nameInputFileDesc, readErr.code, nameTargetFilePath);
		lineStream.close();
	});
	
	lineStream.on("line", function(currentLine)
	{
		lineStream.pause();
		namesFileResult.lineNumber += 1;
		var lineOutcome = readCurrentLine(nameTargetFilePath, nameInputFileDesc, currentLine, namesFileResult);
		
		if (lineOutcome.valid === true)
		{
			lineStream.resume();
		}
		else if (canContinue === true)
		{
			canContinue = false;
			namesFileResult.successful = false;
			namesFileResult.messageText = lineOutcome.errorMessage;
			lineStream.close();
			lineStream.resume();
		}
		else
		{
			canContinue = false;
			lineStream.resume();
		}
	});
	
	lineStream.on("end", function()
	{
		if (namesFileResult.successful === true)
		{
			return fileCallback(null, namesFileResult.entries);
		}
		else
		{
			return fileCallback(new Error(namesFileResult.messageText), null);
		}
	});
}


function readCurrentLine(nameTargetFile, nameInputDesc, lineString, nameFileRes)
{
	var lineResult = validationTasks.defineResult();
	var prepString = valuePrep.castDataLine(lineString);
	var safeLength = validationTasks.checkDataLineLength(nameTargetFile, nameInputDesc, prepString.length, numberLimits.dataLength, nameFileRes.lineNumber, lineResult);
	var lineReady = false;
	
	if (safeLength === true)
	{
		prepString = valuePrep.removeExcessSpace(prepString);
		lineReady = true;
	}
	
	if (lineReady === true && prepString.length > 0 && nameFileRes.lineNumber > 1)
	{
		parseRowString(nameTargetFile, nameInputDesc, prepString, nameFileRes.lineNumber, nameFileRes.entries, lineResult);
	}
	
	return lineResult;
}


function parseRowString(nameTgtFile, nameInpDesc, rowString, currentLineNumber, entryArray, lineResObj)
{
	var comSplit = rowString.split(",");
	var validColumnCount = validationTasks.checkCsvColumnCount(nameTgtFile, nameInpDesc, comSplit.length, 2, currentLineNumber, lineResObj);
	
	var nameValue = "";
	var genderValue = "";
	var validNameLength = false;
	var genderFlagExists = false;
	var validGender = false;
	
	if (validColumnCount === true)
	{
		nameValue = comSplit[0];
		genderValue = comSplit[1].toUpperCase();
		validNameLength = validationTasks.checkNameLength(nameTgtFile, nameInpDesc, nameValue.length, numberLimits.nameLength, currentLineNumber, lineResObj);
	}
	
	if (validNameLength === true)
	{
		genderFlagExists = nameGender.getExists(genderValue);
		validGender = validationTasks.checkGenderResult(nameTgtFile, nameInpDesc, genderFlagExists, currentLineNumber, lineResObj);
	}
	
	if (validGender === true)
	{
		addNameEntry(nameValue, genderValue, entryArray);
	}
}


function addNameEntry(nameVal, genderVal, existingEntries)
{
	var nameLower = nameVal.toLowerCase();
	var existsFlag = -1;
	var entryAdded = false;
	var newObject = {};
	
	existsFlag = existingEntries.findIndex(function(currentEntry)
	{
		return (currentEntry.name.toLowerCase() === nameLower);
	});
	
	if (existsFlag >= 0 && existsFlag < existingEntries.length)
	{
		entryAdded = true;
	}
	else
	{
		newObject = {"name": nameVal, "gender": genderVal};
		existingEntries.push(newObject);
	}
}



module.exports =
{
	readCsv: readCsvFile
};