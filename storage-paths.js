const path = require("path");

function defineStoragePaths()
{
	var defineRes = {};	
	defineRes["inputFolder"] = path.join(".", "input-data");
	defineRes["outputFolder"] = path.join(".", "output-sql");
	defineRes["optionsFile"] = path.join(".", "options.json");
	
	return defineRes;
}


module.exports = defineStoragePaths();