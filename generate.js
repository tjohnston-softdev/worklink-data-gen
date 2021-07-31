// 'workforce-link-generator' - Main script file.

const clear = require("clear");
const readOptionsFile = require("./src/read-options-file");
const createOptionsFile = require("./src/create-options-file");
const readInputData = require("./src/read-input-data");
const generateDatabaseEntries = require("./src/generate-database-entries");
const encryptSensitiveData = require("./src/encrypt-sensitive-data");
const exportSqlFiles = require("./src/export-sql-files");
const exportPlainBackup = require("./src/export-plain-backup");
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
			executeInputDataTask(optionsTaskRes.contents);
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
		executeEncryptionTask(generationOptionsObj.encryption, generationRes);
	});
}


// Encrypt sensitive data
function executeEncryptionTask(encryptionOptionsObject, generatedDataObject)
{
	var genSupportWorkers = generatedDataObject.baseEntries;
	
	encryptSensitiveData(encryptionOptionsObject, genSupportWorkers, function (encTaskErr, plainBackupRes)
	{
		if (encTaskErr !== null)
		{
			exitProgram.callError(encTaskErr.message);
		}
		else
		{
			executeSqlOutputTask(generatedDataObject, plainBackupRes);
		}
	});
}


// Export SQL Files.
function executeSqlOutputTask(genDataObject, plainDataObject)
{
	exportSqlFiles(genDataObject, function (expTaskErr, expTaskRes)
	{
		if (expTaskErr !== null)
		{
			exitProgram.callError(expTaskErr.message);
		}
		else
		{
			executePlainOutputTask(plainDataObject);
		}
	});
}


// Export Plain Text Data File.
function executePlainOutputTask(plainDataObj)
{
	exportPlainBackup(plainDataObj, function (plainTaskErr, plainTaskRes)
	{
		if (plainTaskErr !== null)
		{
			exitProgram.callError(plainTaskErr.message);
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