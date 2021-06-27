# Changelog

**./src/generation/foreign-key-lists.js**
* Wrote new functions:
	* 'mapChecksClearances'
		* Populates the 'SupportWorkerChecks' table.
	* 'handleCheckWillingness'
		* If the account does not have any checks and 'showWillingness' is enabled, they will be willing to obtain.
		* These entries will be selected as default.
* Added call to 'mapChecksClearances' in 'generateListEntries'
