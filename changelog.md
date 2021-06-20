# Changelog

**./src/common/validation-tasks.js**
* Wrote new function 'checkCsvColumnCountNumber'
	* Checks the number of columns in a CSV row line.
* Wrote new function 'checkGenderFlagResult'
	* Handles error detection for gender character.
	* The checking itself is performed in 'name-gender.js'
* Wrote new function 'checkNameLengthNumber'
	* Validates length of name string.
	* Separate error messages for 'too long' and 'empty'

---

**./src/common/name-gender.js**
* New file - Contains definitions for name gender options.
	* Male
	* Female
	* Unisex
* Can also check whether a given character is a valid gender.

---

**./src/input/read-first-names.js**
* New file - Used to read and parse 'first names' CSV data.
