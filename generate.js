const clear = require("clear");
const readOptionsFile = require("./src/read-options-file");
const createOptionsFile = require("./src/create-options-file");

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
			console.log("Successful");
			process.exitCode = 1;
		}
		else
		{
			executeOptionsCreateTask();
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