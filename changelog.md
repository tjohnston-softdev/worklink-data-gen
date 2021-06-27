# Changelog

**./src/generation/foreign-key-lists.js**
* New file - Used to populate rows for many-to-many tables.
	* SupportWorkerOtherLanguages
	* SupportWorkerChecks
	* *etc*
* Supports both required and optional tables.
* Only 'SupportWorkerOtherLanguages' is populated for now.

---

**./src/generate-database-entries.js**
* Added requirement: './generation/foreign-key-lists'
* Added call to 'foreignKeyLists' in 'coordinateGeneration'
