# Changelog

**./src/encrypt-sensitive-data.js**
* New file
	* Script for encrypting sensitive Support Worker fields.
	* Only a template for now.

---

**./generate.js**
* Added requirement: './src/encrypt-sensitive-data'
* Wrote new function 'executeEncryptionTask'
	* Runs 'encryptSensitiveData' script.
	* Called between 'executeGenerationTask' and 'executeOutputTask'
* Uncommented 'executeInputDataTask' call.
* Commented out 'executeOutputTask' call.
