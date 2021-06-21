const clear = require("clear");
const readOptionsFile = require("./src/read-options-file");
const createOptionsFile = require("./src/create-options-file");
const readInputData = require("./src/read-input-data");

clear();
runGenerationMain();


function runGenerationMain()
{
	readOptionsFile(function (optionsTaskErr, optionsTaskRes)
	{
		if (optionsTaskErr !== null)
		{
			console.log(optionsTaskErr.message);
			process.exitCode = 1;
		}
		else if (optionsTaskRes.contents !== null)
		{
			executeInputDataTask(optionsTaskRes.contents);
		}
		else
		{
			executeOptionsCreateTask();
		}
	});
}


function executeInputDataTask(generationOptionsObject)
{
	var startTime = null;
	var endTime = null;
	var sec = -1;
	var milsec = -1;
	
	startTime = process.hrtime();
	
	readInputData(function (inpTaskErr, inpTaskRes)
	{
		if (inpTaskErr !== null)
		{
			console.log(inpTaskErr.message);
			process.exitCode = 1;
		}
		else
		{
			console.log("");
			process.exitCode = 1;
		}
	});
}


function executeOptionsCreateTask()
{
	createOptionsFile(function (createTaskErr, createTaskRes)
	{
		if (createTaskErr !== null)
		{
			console.log(createTaskErr.message);
		}
		
		process.exitCode = 1;
	});
}