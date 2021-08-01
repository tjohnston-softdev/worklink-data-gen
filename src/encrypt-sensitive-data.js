// Script encrypts personal information regarding Support Workers.

const each = require("async-each-series");
const series = require("run-series");
const ora = require("ora");
const encodeField = require("./encryption/encode-field");
const hashPass = require("./encryption/hash-pass");
const backupPlainText = require("./encryption/backup-plain-text");


// Main function.
function performSensitiveDataEncryption(encryptOptsObject, supportWorkerDataArray, dataEncryptionCallback)
{
	if (encryptOptsObject.enabled === true)
	{
		// Continue.
		coordinateEncryption(encryptOptsObject, supportWorkerDataArray, dataEncryptionCallback);
	}
	else
	{
		// Skip.
		skipEncryption(dataEncryptionCallback);
	}
}

// Loading spinner.
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


// Data encryption loop.
function loopSupportWorkers(encryptOpts, swDataArray, loopCallback)
{
	// Perform backup first.
	var plainArray = backupPlainText(swDataArray);
	
	
	// Loop Support Worker accounts.
	each(swDataArray,
	function (currentSupportWorker, iterationCallback)
	{
		// Current iteration.
		encryptSupportWorker(encryptOpts, currentSupportWorker, iterationCallback);
	},
	function (loopErr)
	{
		// Loop complete.
		if (loopErr !== undefined)
		{
			// Error.
			return loopCallback(loopErr, null);
		}
		else
		{
			// Successful - Return plain backup.
			return loopCallback(null, plainArray);
		}
	});
}


// Encrypts current Support Worker.
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


// Skip data encryption.
function skipEncryption(skipCallback)
{
	var skipSpinner = ora("Skipping").start();
	skipSpinner.info("Encryption Skipped");
	return skipCallback(null, null);
}

module.exports = performSensitiveDataEncryption;