# Changelog

**./src/generation/gen-data.js**
* 'defineGeneratedDataObject' is now called publicly as 'defineResult'
* Wrote new function 'defineBaseObject'
	* Defines local data object for current base SupportWorker entry.
	* 'name' is set to "Placeholder"

---

**./src/generate-database-entries.js - coordinateGeneration**
* Updated 'genData' call.
* Merged these variables into 'currentBase'
	* currentGender
	* currentName
	* currentRegister
	* currentDOB
	* currentChronoAge
	* currentFeelsAge
* Split 'currentBase' definition into new function 'prepareBaseData'
	* 'localName' is commented out.
* Split 'currentAccount' into new function 'generateAccount'
