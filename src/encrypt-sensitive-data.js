const each = require("async-each-series");
const series = require("run-series");
const ora = require("ora");
const encodeField = require("./encryption/encode-field");
const hashPass = require("./encryption/hash-pass");


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
	
	each(supportWorkerData,
	function (currentSupportWorker, iterationCallback)
	{
		encryptSupportWorker(encryptOptsObj, currentSupportWorker, iterationCallback);
	},
	function (encLoopErr)
	{
		if (encLoopErr !== undefined)
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
	return skipCallback(null, true);
}



module.exports = performSensitiveDataEncryption;