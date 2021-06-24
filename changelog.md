# Changelog

**./src/generation/written-descriptions.js**
* New file - Writes description text from input data keywords.

---

**./src/read-input-data.js - coordinateData**
* Uncommented tasks:
	* quotes
	* encouragingWords
	* ingForms

---

**./src/generate-database-entries.js**
* Added requirement: './generation/written-descriptions'
* coordinateGeneration
	* Renamed 'currentParent' to 'currentAccount'
	* Added calls to 'writtenDescriptions'
		* 'writeAbout' for 'aboutDesc'
		* 'writeRequired' for 'skillDesc'
		* 'writeOptional' for 'apperanceDesc'
