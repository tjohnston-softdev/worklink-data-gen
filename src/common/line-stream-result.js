function initializeResultObject()
{
	var dataRes = {};
	
	dataRes["successful"] = true;
	dataRes["lineNumber"] = 0;
	dataRes["entries"] = [];
	dataRes["messageText"] = "";
	
	return dataRes;
}



module.exports =
{
	initializeObject: initializeResultObject
};