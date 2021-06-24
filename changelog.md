# Changelog

**./src/generation/person-int.js - New Functions**
* 'chooseRandomLanguageFlags' - Generates flag values for:
	* englishLanguageFlag
	* signLanguageFlag
* handleFlag
	* Generates flag with a given percent of being true.
	* Adds to parent object.

---

**./src/generate-database-entries.js - coordinateGeneration**
* Added call to 'personInt.chooseLanguageFlags'
