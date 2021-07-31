const series = require("run-series");
const ora = require("ora");
const randomTasks = require("./common/random-tasks");


function performSensitiveDataEncryption(encryptOptsObject, supportWorkerDataArray, dataEncryptionCallback)
{
	if (encryptOptsObject.enabled === true)
	{
		coordinateEncryption(encryptOptsObject, supportWorkerDataArray, dataEncryptionCallback);
	}
	else
	{
		skipEncryption(dataEncryptionCallback);
	}
}


function coordinateEncryption(encryptOptsObj, supportWorkerData, coordCallback)
{
	var encryptionSpinner = ora("Encrypting Sensitive Data").start();
	
	loopSupportWorkerEncryption(encryptOptsObj, supportWorkerData, function (encLoopErr)
	{
		if (encLoopErr !== null)
		{
			encryptionSpinner.fail("Data Encryption Error");
			return coordCallback(encLoopErr, null);
		}
		else
		{
			encryptionSpinner.succeed("Data Encrypted Successfully");
			return coordCallback(null, true);
		}
	});
}


function loopSupportWorkerEncryption(encryptOpts, swDataArray, loopCallback)
{
	var waitLength = randomTasks.rollInteger(2000, 5000);
	
	setTimeout(function()
	{
		return loopCallback(null);
	}, waitLength);
}


function skipEncryption(skipCallback)
{
	var skipSpinner = ora("Skipping").start();
	skipSpinner.info("Encryption Skipped");
	return skipCallback(null, true);
}



module.exports = performSensitiveDataEncryption;