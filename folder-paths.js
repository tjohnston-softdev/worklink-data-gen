const path = require("path");

function defineFolderPaths()
{
	var defineRes = {};	
	defineRes["input"] = path.join(".", "input-data");
	defineRes["output"] = path.join(".", "output-sql");
	
	return defineRes;
}


module.exports = defineFolderPaths();