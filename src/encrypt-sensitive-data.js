const each = require("async-each-series");
const series = require("run-series");
const ora = require("ora");
const encodeField = require("./encryption/encode-field");
const hashPass = require("./encryption/hash-pass");
const backupPlainText = require("./encryption/backup-plain-text");


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
	
	loopSupportWorkers(encryptOptsObj, supportWorkerData, function (encLoopErr, encLoopRes)
	{
		if (encLoopErr !== null)
		{
			encryptionSpinner.fail("Data encryption error");
			return coordCallback(encLoopErr, null);
		}
		else
		{
			encryptionSpinner.succeed("Data encrypted successfully");
			return coordCallback(null, encLoopRes);
		}
	});
}


function loopSupportWorkers(encryptOpts, swDataArray, loopCallback)
{
	var plainArray = backupPlainText(swDataArray);
	
	each(swDataArray,
	function (currentSupportWorker, iterationCallback)
	{
		encryptSupportWorker(encryptOpts, currentSupportWorker, iterationCallback);
	},
	function (loopErr)
	{
		if (loopErr !== undefined)
		{
			return loopCallback(loopErr, null);
		}
		else
		{
			return loopCallback(null, plainArray);
		}
	});
}


function encryptSupportWorker(encryptOpts, swObject, supportCallback)
{
	series(
	[
		encodeField.bind(null, encryptOpts, swObject, 1, "emailAddress"),
		encodeField.bind(null, encryptOpts, swObject, 2, "driversLicenseNumber"),
		encodeField.bind(null, encryptOpts, swObject, 3, "phoneContactNumber"),
		hashPass.bind(null, encryptOpts.checkMatch, swObject)
	],
	function (iterationErr)
	{
		supportCallback(iterationErr);
	});
}


function skipEncryption(skipCallback)
{
	var skipSpinner = ora("Skipping").start();
	skipSpinner.info("Encryption Skipped");
	return skipCallback(null, null);
}



module.exports = performSensitiveDataEncryption;