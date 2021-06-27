# Changelog

**./src/common/add-separator.js**
* New file - Function to add separator string between keywords when writing descriptions.

---

**./src/generation/written-descriptions.js**
* Required '../common/add-separator'
* addSeparator
	* Moved to '../common/add-separator.js'
	* New name: 'addSeparatorString'
* composeText
	* 'fullDesc' is added to 'parentObj' instead of a placeholder.

---

**./src/generation/other-general-description.js**
* New file - Writes 'otherGeneral' description.
* Pools together keywords from most input data files.

---

**./src/read-input-data.js - coordinateData**
* Uncommented 'callLineData'
	* 'callNameData' remains commented out.

---

**./src/generate-database-entries.js**
* Added requirement for './generation/other-general-description'
* Wrote new function 'generateOther'
	* Used to generate rows for the 'SupportWorkerOther' table.
	* Populates all columns except for 'otherAvailability'
* Added call to 'generateOther' in 'coordinateGeneration'
