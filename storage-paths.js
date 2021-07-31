// Storage paths.

const path = require("path");

function defineStoragePaths()
{
	var defineRes = {};	
	defineRes["inputFolder"] = path.join(".", "input-data");
	defineRes["outputFolder"] = path.join(".", "output-files");
	defineRes["optionsFile"] = path.join(".", "options.json");
	
	return defineRes;
}


module.exports = defineStoragePaths();