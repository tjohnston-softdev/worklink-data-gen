// 'workforce-link-generator' - Main script file.

const clear = require("clear");
const readOptionsFile = require("./src/read-options-file");
const createOptionsFile = require("./src/create-options-file");
const readInputData = require("./src/read-input-data");
const generateDatabaseEntries = require("./src/generate-database-entries");
const exportSqlFiles = require("./src/export-sql-files");
const exitProgram = require("./src/exit-program");

clear();
runGenerationMain();


// Main function.
function runGenerationMain()
{
	readOptionsFile(function (optionsTaskErr, optionsTaskRes)
	{
		if (optionsTaskErr !== null)
		{
			// Error reading options.
			exitProgram.callError(optionsTaskErr.message);
		}
		else if (optionsTaskRes.contents !== null)
		{
			// Options successful - Read input data.
			//executeInputDataTask(optionsTaskRes.contents);
			console.log("Valid");
		}
		else
		{
			// Options does not exist - Create file.
			executeOptionsCreateTask();
		}
	});
}


// Read Input Data.
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
			executeGenerationTask(generationOptionsObject, inpTaskRes);
		}
	});
}


// Generate Database Entries.
function executeGenerationTask(generationOptionsObj, keywordDataObj)
{
	generateDatabaseEntries(generationOptionsObj, keywordDataObj, function(generationRes)
	{
		executeOutputTask(generationRes);
	});
}


// Export SQL Files.
function executeOutputTask(generatedDataObject)
{
	exportSqlFiles(generatedDataObject, function (expTaskErr, expTaskRes)
	{
		if (expTaskErr !== null)
		{
			exitProgram.callError(expTaskErr.message);
		}
		else
		{
			// Complete.
			exitProgram.callSuccessful();
		}
	});
}


// Create Options File.
function executeOptionsCreateTask()
{
	createOptionsFile(function (createTaskErr, createTaskRes)
	{
		if (createTaskErr !== null)
		{
			console.log(createTaskErr.message);
			exitProgram.callError(createTaskErr.message);
		}
		else
		{
			exitProgram.callError();
		}
		
	});
}