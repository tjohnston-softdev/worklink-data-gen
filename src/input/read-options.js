// Reads and parses JSON file.

const fs = require("fs");
const yieldableJson = require("yieldable-json");
const fsErrors = require("../common/fs-errors");


// Main function.
function readOptionsFile(targetPath, fileCallback)
{
	var flaggedMessage = "";
	
	// Read raw file contents.
	fs.readFile(targetPath, "utf8", function(readErr, readRes)
	{
		if (readErr !== null)
		{
			// Read error.
			flaggedMessage = fsErrors.writeFileRead("Options", readErr.code, targetPath);
			return fileCallback(new Error(flaggedMessage), null);
		}
		else
		{
			// Read successful.
			parseJsonDefinition(targetPath, readRes, fileCallback);
		}
	});
}


// Parses file contents into a JSON object.
function parseJsonDefinition(tgtPth, optData, parseCallback)
{
	var parseMsg = "";
	
	
	// Uses callback structure.
	yieldableJson.parseAsync(optData, function(parseErr, parseRes)
	{
		if (parseErr !== null)
		{
			// JSON error.
			parseMsg = fsErrors.writeJsonParse("Options", parseErr.message, tgtPth);
			return parseCallback(new Error(parseMsg), null);
		}
		else
		{
			// Parse successful.
			return parseCallback(null, parseRes);
		}
	});
}



module.exports = readOptionsFile;