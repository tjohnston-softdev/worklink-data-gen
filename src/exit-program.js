// Functions to exit script.


// Completed successfully.
function callSuccessfulExit()
{
	console.log("");
	console.log("Complete");
	process.exitCode = 1;
}


// Error.
function callErrorExit(errMsg)
{
	var valueType = typeof errMsg;
	
	if (valueType === "string")
	{
		// Optionally display error message.
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