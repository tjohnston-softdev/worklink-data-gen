const fs = require("fs");
const lineByLine = require("line-by-line");
const fsErrors = require("../common/fs-errors");
const lineStreamResult = require("../common/line-stream-result");
const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");
const valuePrep = require("../common/value-prep");
const nameGender = require("../common/name-gender");


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
	var safeLength = callDataLengthCheck(nameTargetFile, nameInputDesc, prepString.length, nameFileRes.lineNumber, lineResult);
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


function parseRowString(nameTgtFile, nameInpDesc, rowString, fileLineNum, entryArray, lineResObj)
{
	var comSplit = rowString.split(",");
	var validColumnCount = validationTasks.checkCsvColumnCount(nameTgtFile, nameInpDesc, comSplit.length, 2, fileLineNum, lineResObj);
	
	var nameValue = "";
	var genderValue = "";
	var validName = false;
	var genderFlagExists = false;
	var validGender = false;
	
	if (validColumnCount === true)
	{
		nameValue = comSplit[0];
		genderValue = comSplit[1].toUpperCase();
		validName = validationTasks.checkNameLength(nameTgtFile, nameInpDesc, nameValue.length, numberLimits.nameLength, fileLineNum, lineResObj);
	}
	
	if (validName === true)
	{
		genderFlagExists = nameGender.getExists(genderValue);
		validGender = validationTasks.checkGenderResult(nameTgtFile, nameInpDesc, genderFlagExists, fileLineNum, lineResObj);
	}
	
	if (validGender === true)
	{
		addNameEntry(nameValue, genderValue, entryArray);
	}
}


function addNameEntry(nameVal, genderVal, existingEntries)
{
	var nameLower = nameVal.toLowerCase();
	
	var existIndex = 0;
	var currentEntry = {};
	var currentName = "";
	var matchFlag = -1;
	
	var entryAdded = false;
	var newObject = {};
	
	while (existIndex >= 0 && existIndex < existingEntries.length && matchFlag === -1)
	{
		currentEntry = existingEntries[existIndex];
		currentName = currentEntry.name.toLowerCase();
		
		if (currentName === nameLower)
		{
			matchFlag = existIndex;
		}
		
		existIndex = existIndex + 1;
	}
	
	if (matchFlag >= 0 && matchFlag < existingEntries.length)
	{
		entryAdded = true;
	}
	else
	{
		newObject = {"name": nameVal, "gender": genderVal};
		existingEntries.push(newObject);
	}
}


function callDataLengthCheck(fileArg, descArg, lengthArg, lineNumArg, resArg)
{
	var lengthRes = validationTasks.checkDataLineLength(fileArg, descArg, lengthArg, numberLimits.dataLength, lineNumArg, resArg);
	return lengthRes;
}



module.exports =
{
	readCsv: readCsvFile
};