# Changelog

**./src/common/fs-error-text.js**
* Wrote new function 'writeJsonStringifyError'

---

**./src/encryption/backup-plain-text.js**
* New file - Saves sensitive information in plain-text before it is encrypted.

---

**./src/encrypt-sensitive-data.js**
* Added requirement: './encryption/backup-plain-text'
* Split the 'each' loop to its own function 'loopSupportWorkers'
	* Contains call to 'backupPlainText'
	* On success, return 'backupPlainText' result.
* Added 'encLoopRes' callback parameter to 'coordinateEncryption'
	* Returned on successful result.
* 'skipEncryption' now returns `null` instead of `true`
	* This isn't an error. A null result value means encryption was skipped.
* Removed capitalization from spinner result messages.
* Changed callback error check in 'coordinateEncryption' from `undefined` to `null`

---

**./src/export-plain-backup.js**
* New file - Script used to export plain text backup as a JSON file.

---

**./generate.js**
* Added requirement: './src/export-plain-backup'
* Wrote new function 'executePlainOutputTask'
	* Calls 'exportPlainBackup' script.
* executeEncryptionTask
	* Renamed 'encTaskRes' callback parameter to 'plainBackupRes'
	* 'generatedDataObject.baseEntries' is now a local variable 'genSupportWorkers'
* executeOutputTask
	* Renamed to 'executeSqlOutputTask'
	* Declared 'plainDataObject' parameter.
	* On successful, call 'executePlainOutputTask'
