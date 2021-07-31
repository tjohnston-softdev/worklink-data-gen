# Changelog

**./src/common/encryption-error-text.js**
* New file - Writes error text for encryption tasks.

---

**./src/encryption/**
* New folder - Contains scripts to encrypt sensitive information.
	* Encoding specific fields (encode-field.js)
	* Hashing passwords (hash-pass.js)

---

**./src/encrypt-sensitive-data.js**
* Added new requirements:
	* async-each-series
	* ./encryption/encode-field
	* ./encryption/hash-pass
* Removed requirement: './common/random-tasks'
* Removed 'loopSupportWorkerEncryption' function.
* Replaced 'loopSupportWorkerEncryption' call with 'each' loop.
* Wrote new function 'encryptSupportWorker'
* Changed 'encLoopErr' check to `undefined` instead of `null`

---

**./generate.js**
* Replaced 'aaaa' with 'baseEntries' (executeEncryptionTask)
* Renamed 'generatedDataObject' parameter to 'genDataObject' (executeOutputTask)
* Removed "Valid" log message (runGenerationMain)

---

**./options.json**
* Set 'supportWorkerCount' to 10
