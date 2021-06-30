// Reads input data text file line by line.

const fs = require("fs");
const lineByLine = require("line-by-line");
const fsErrors = require("../common/fs-errors");
const lineStreamResult = require("../common/line-stream-result");
const validationTasks = require("../common/validation-tasks");
const numberLimits = require("../common/number-limits");
const valuePrep = require("../common/value-prep");


// Main function.
function readDataFile(targetPath, inputFileDesc, dataEntryName, dataEntryLength, fileCallback)
{
	var dataFileResult = lineStreamResult.initializeObject();
	var canContinue = true;
	var lineStream = new lineByLine(targetPath);
	
	
	// Line stream error.
	lineStream.on("error", function(readErr)
	{
		canContinue = false;
		dataFileResult.successful = false;
		dataFileResult.messageText = fsErrors.writeFileRead(inputFileDesc, readErr.code, targetPath);
		lineStream.close();
	});
	
	
	// Read current line.
	lineStream.on("line", function(currentLine)
	{
		lineStream.pause();
		dataFileResult.lineNumber += 1;
		var lineOutcome = readCurrentLine(targetPath, inputFileDesc, dataEntryName, dataEntryLength, currentLine, dataFileResult);
		
		if (lineOutcome.valid === true)
		{
			// Line parsed successfully - Keep going.
			lineStream.resume();
		}
		else if (canContinue === true)
		{
			// Line invalid - Stop reading.
			canContinue = false;
			dataFileResult.successful = false;
			dataFileResult.messageText = lineOutcome.errorMessage;
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
		if (dataFileResult.successful === true)
		{
			// Data parsed successfully.
			return fileCallback(null, dataFileResult.entries);
		}
		else
		{
			// Flagged error.
			return fileCallback(new Error(dataFileResult.messageText), null);
		}
	});
}


// Reads current data text line.
function readCurrentLine(tgtPath, inpFileDesc, entryName, entryLength, lineString, dataFileRes)
{
	var readLineNum = dataFileRes.lineNumber;
	var lineResult = validationTasks.defineResult();
	var prepString = "";
	var safeLength = false;
	var validLengthFlag = -1;
	
	// Check raw string.
	prepString = valuePrep.castDataLine(lineString);
	safeLength = validationTasks.checkDataLineLength(tgtPath, inpFileDesc, prepString.length, numberLimits.dataLength, readLineNum, lineResult);
	
	
	if (safeLength === true)
	{
		// Remove excess space and validate updated length.
		prepString = valuePrep.removeExcessSpace(prepString);
		validLengthFlag = validationTasks.checkDataEntryLength(tgtPath, inpFileDesc, entryName, prepString.length, entryLength, readLineNum, lineResult);
	}
	
	if (validLengthFlag > 0)
	{
		// Line can be added to entry array.
		addNewEntry(prepString, dataFileRes.entries);
	}
	
	return lineResult;
}


// Adds prepared text line to entry array.
function addNewEntry(entryTxt, existingEntries)
{
	var entryLower = entryTxt.toLowerCase();
	
	var existIndex = 0;
	var currentEntry = "";
	var matchFlag = -1;
	
	var entryAdded = false;
	
	
	// Loop checks if string already exists - Case insensitive.
	while (existIndex >= 0 && existIndex < existingEntries.length && matchFlag === -1)
	{
		// Read current entry.
		currentEntry = existingEntries[existIndex];
		currentEntry = currentEntry.toLowerCase();
		
		
		if (currentEntry === entryLower)
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
		existingEntries.push(entryTxt);
		entryAdded = true;
	}
}



module.exports =
{
	readFile: readDataFile
};