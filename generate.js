const clear = require("clear");
const readOptionsFile = require("./src/read-options-file");
const createOptionsFile = require("./src/create-options-file");
const readInputData = require("./src/read-input-data");
const exitProgram = require("./src/exit-program");

clear();
runGenerationMain();


function runGenerationMain()
{
	readOptionsFile(function (optionsTaskErr, optionsTaskRes)
	{
		if (optionsTaskErr !== null)
		{
			exitProgram.callError(optionsTaskErr.message);
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
	readInputData(function (inpTaskErr, inpTaskRes)
	{
		if (inpTaskErr !== null)
		{
			exitProgram.callError(inpTaskErr.message);
		}
		else
		{
			exitProgram.callSuccessful();
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
		
		exitProgram.callError();
	});
}