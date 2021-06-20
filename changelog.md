# Changelog

**./src/common/value-prep.js**
* Removed 'neutralizeStringCasing'

---

**./src/input/read-line-data.js - addNewEntry**
* Removed the 'preparedObject' variable.
* Declared new variable 'entryLower'
* Renamed 'findIndex' parameter from 'currentObject' to 'currentEntry'
* Replaced 'findIndex' arguments.
	* 'currentObject.lowerString' with `currentEntry.toLowerCase()`
	* 'preparedObject.lowerString' with 'entryLower'
* existingEntries.push
	* Replaced 'preparedObject' with 'entryTxt'
