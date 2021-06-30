// Reads 'first-names.csv' file line by line.

const fs = require("fs");
const lineByLine = require("line-by-line");
const fsErrors = require("../common/fs-errors");
const lineStreamResult = require("../common/line-stream-result");
const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");
const valuePrep = require("../common/value-prep");
const nameGender = require("../common/name-gender");


// Main function.
function readCsvFile(nameTargetFilePath, nameInputFileDesc, fileCallback)
{
	var namesFileResult = lineStreamResult.initializeObject();
	var canContinue = true;
	var lineStream = new lineByLine(nameTargetFilePath);
	
	
	// Line stream error.
	lineStream.on("error", function(readErr)
	{
		canContinue = false;
		namesFileResult.successful = false;
		namesFileResult.messageText = fsErrors.writeFileRead(nameInputFileDesc, readErr.code, nameTargetFilePath);
		lineStream.close();
	});
	
	
	// Read current row.
	lineStream.on("line", function(currentLine)
	{
		lineStream.pause();
		namesFileResult.lineNumber += 1;
		var lineOutcome = readCurrentLine(nameTargetFilePath, nameInputFileDesc, currentLine, namesFileResult);
		
		if (lineOutcome.valid === true)
		{
			// Row parsed successfully - Continue reading.
			lineStream.resume();
		}
		else if (canContinue === true)
		{
			// Row invalid - Stop reading.
			canContinue = false;
			namesFileResult.successful = false;
			namesFileResult.messageText = lineOutcome.errorMessage;
			lineStream.close();
			lineStream.resume();
		}
		else
		{
			// Aborting line stream.
			canContinue = false;
			lineStream.resume();
		}
	});
	
	
	// End reached.
	lineStream.on("end", function()
	{
		if (namesFileResult.successful === true)
		{
			// Names parsed successfully.
			return fileCallback(null, namesFileResult.entries);
		}
		else
		{
			// Flagged error.
			return fileCallback(new Error(namesFileResult.messageText), null);
		}
	});
}


// Reads current CSV row line.
function readCurrentLine(nameTargetFile, nameInputDesc, lineString, nameFileRes)
{
	var lineResult = validationTasks.defineResult();
	var prepString = "";
	var safeLength = false;
	var lineReady = false;
	
	// Check raw string.
	prepString = valuePrep.castDataLine(lineString);
	safeLength = callDataLengthCheck(nameTargetFile, nameInputDesc, prepString.length, nameFileRes.lineNumber, lineResult);
	
	if (safeLength === true)
	{
		// Remove excess space and validate updated length.
		prepString = valuePrep.removeExcessSpace(prepString);
		lineReady = true;
	}
	
	if (lineReady === true && prepString.length > 0 && nameFileRes.lineNumber > 1)
	{
		// Line can be parsed.
		parseRowString(nameTargetFile, nameInputDesc, prepString, nameFileRes.lineNumber, nameFileRes.entries, lineResult);
	}
	
	return lineResult;
}


// Parse CSV row.
function parseRowString(nameTgtFile, nameInpDesc, rowString, fileLineNum, entryArray, lineResObj)
{
	var comSplit = [];
	var validColumnCount = false;
	var nameValue = "";
	var genderValue = "";
	var validName = false;
	var genderFlagExists = false;
	var validGender = false;
	
	// Check column count.
	comSplit = rowString.split(",");
	validColumnCount = validationTasks.checkCsvColumnCount(nameTgtFile, nameInpDesc, comSplit.length, 2, fileLineNum, lineResObj);
	
	
	if (validColumnCount === true)
	{
		// Read individual columns, and validate name.
		nameValue = comSplit[0];
		genderValue = comSplit[1].toUpperCase();
		validName = validationTasks.checkNameLength(nameTgtFile, nameInpDesc, nameValue.length, numberLimits.nameLength, fileLineNum, lineResObj);
	}
	
	if (validName === true)
	{
		// Validate gender.
		genderFlagExists = nameGender.getExists(genderValue);
		validGender = validationTasks.checkGenderResult(nameTgtFile, nameInpDesc, genderFlagExists, fileLineNum, lineResObj);
	}
	
	if (validGender === true)
	{
		// Name row can be added to entries.
		addNameEntry(nameValue, genderValue, entryArray);
	}
}


// Add name row to entry array.
function addNameEntry(nameVal, genderVal, existingEntries)
{
	var nameLower = nameVal.toLowerCase();
	
	var existIndex = 0;
	var currentEntry = {};
	var currentName = "";
	var matchFlag = -1;
	
	var entryAdded = false;
	var newObject = {};
	
	
	// Loop checks if name already exists - Case insensitive.
	while (existIndex >= 0 && existIndex < existingEntries.length && matchFlag === -1)
	{
		// Read current name.
		currentEntry = existingEntries[existIndex];
		currentName = currentEntry.name.toLowerCase();
		
		if (currentName === nameLower)
		{
			// Match found.
			matchFlag = existIndex;
		}
		
		existIndex = existIndex + 1;
	}
	
	
	if (matchFlag >= 0 && matchFlag < existingEntries.length)
	{
		// Already exists.
		entryAdded = true;
	}
	else
	{
		// Add to array.
		newObject = {"name": nameVal, "gender": genderVal};
		existingEntries.push(newObject);
	}
}


// Shortcut to validate raw line length.
function callDataLengthCheck(fileArg, descArg, lengthArg, lineNumArg, resArg)
{
	var lengthRes = validationTasks.checkDataLineLength(fileArg, descArg, lengthArg, numberLimits.dataLength, lineNumArg, resArg);
	return lengthRes;
}



module.exports =
{
	readCsv: readCsvFile
};