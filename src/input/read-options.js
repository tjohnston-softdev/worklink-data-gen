const fs = require("fs");
const yieldableJson = require("yieldable-json");
const fsErrors = require("../common/fs-errors");


function readOptionsFile(targetPath, fileCallback)
{
	var flaggedMessage = "";
	
	fs.readFile(targetPath, "utf8", function(readErr, readRes)
	{
		if (readErr !== null)
		{
			flaggedMessage = fsErrors.writeFileRead("Options", readErr.code, targetPath);
			return fileCallback(new Error(flaggedMessage), null);
		}
		else
		{
			parseJsonDefinition(targetPath, readRes, fileCallback);
		}
	});
}


function parseJsonDefinition(tgtPth, optData, parseCallback)
{
	var parseMsg = "";
	
	yieldableJson.parseAsync(optData, function(parseErr, parseRes)
	{
		if (parseErr !== null)
		{
			parseMsg = fsErrors.writeJsonParse("Options", parseErr.message, tgtPth);
			return parseCallback(new Error(parseMsg), null);
		}
		else
		{
			return parseCallback(null, parseRes);
		}
	});
}



module.exports = readOptionsFile;