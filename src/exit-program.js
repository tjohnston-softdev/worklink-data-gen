function callSuccessfulExit()
{
	console.log("");
	console.log("Complete");
	process.exitCode = 1;
}


function callErrorExit(errMsg)
{
	var valueType = typeof errMsg;
	
	if (valueType === "string")
	{
		console.log("");
		console.log(errMsg);
	}
	
	process.exitCode = 1;
}



module.exports =
{
	callSuccessful: callSuccessfulExit,
	callError: callErrorExit
};