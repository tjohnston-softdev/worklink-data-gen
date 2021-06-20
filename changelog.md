# Changelog

**./src/input/read-line-data.js**
* readDataFile
	* Removed spaces from event function argument lists.
* readCurrentLine
	* Declared new variable 'readLineNum' - Shortcut for current line number.

---

**./src/input/read-first-names.js**
* Split the 'checkDataLineLength' call into its own function 'callDataLengthCheck'
* parseRowString
	* Renamed the 'validNameLength' variable to 'validName'
	* Renamed the 'currentLineNumber' parameter to 'fileLineNum'
