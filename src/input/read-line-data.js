const fs = require("fs");
const lineByLine = require("line-by-line");
const fsErrors = require("../common/fs-errors");
const lineStreamResult = require("../common/line-stream-result");
const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");
const valuePrep = require("../common/value-prep");


function readDataFile(targetPath, inputFileDesc, dataEntryName, dataEntryLength, fileCallback)
{
	var dataFileResult = lineStreamResult.initializeObject();
	var canContinue = true;
	var lineStream = new lineByLine(targetPath);
	
	lineStream.on("error", function(readErr)
	{
		canContinue = false;
		dataFileResult.successful = false;
		dataFileResult.messageText = fsErrors.writeFileRead(inputFileDesc, readErr.code, targetPath);
		lineStream.close();
	});
	
	lineStream.on("line", function(currentLine)
	{
		lineStream.pause();
		dataFileResult.lineNumber += 1;
		var lineOutcome = readCurrentLine(targetPath, inputFileDesc, dataEntryName, dataEntryLength, currentLine, dataFileResult);
		
		if (lineOutcome.valid === true)
		{
			lineStream.resume();
		}
		else if (canContinue === true)
		{
			canContinue = false;
			dataFileResult.successful = false;
			dataFileResult.messageText = lineOutcome.errorMessage;
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
		if (dataFileResult.successful === true)
		{
			return fileCallback(null, dataFileResult.entries);
		}
		else
		{
			return fileCallback(new Error(dataFileResult.messageText), null);
		}
	});
}


function readCurrentLine(tgtPath, inpFileDesc, entryName, entryLength, lineString, dataFileRes)
{
	var readLineNum = dataFileRes.lineNumber;
	var lineResult = validationTasks.defineResult();
	var prepString = valuePrep.castDataLine(lineString);
	var safeLength = validationTasks.checkDataLineLength(tgtPath, inpFileDesc, prepString.length, numberLimits.dataLength, readLineNum, lineResult);
	var validLengthFlag = -1;
	
	if (safeLength === true)
	{
		prepString = valuePrep.removeExcessSpace(prepString);
		validLengthFlag = validationTasks.checkDataEntryLength(tgtPath, inpFileDesc, entryName, prepString.length, entryLength, readLineNum, lineResult);
	}
	
	if (validLengthFlag > 0)
	{
		addNewEntry(prepString, dataFileRes.entries);
	}
	
	return lineResult;
}


function addNewEntry(entryTxt, existingEntries)
{
	var entryLower = entryTxt.toLowerCase();
	var existsFlag = -1;
	var entryAdded = false;
	
	existsFlag = existingEntries.findIndex(function(currentEntry)
	{
		return (currentEntry.toLowerCase() === entryLower);
	});
	
	if (existsFlag >= 0 && existsFlag < existingEntries.length)
	{
		entryAdded = true;
	}
	else
	{
		existingEntries.push(entryTxt);
		entryAdded = true;
	}
}



module.exports =
{
	readFile: readDataFile
};