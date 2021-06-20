# Changelog

**./src/common/line-stream-result.js**
* New file - Defines result object for reading input files line by line.

---

**./src/common/value-prep.js**
* New file - Contains functions for preparing input values.
	* Cast string value.
	* Remove excess whitespace.
	* Neutralize character casing. - Also saves location of capital letters.

---

**./src/common/validation-tasks.js - New functions**
* writeLineStreamErrorText
	* Writes error text for line streaming.
* checkDataLineLengthNumber
	* Validates the length of a data line.
* checkDataEntryLengthNumber'
	* Validates the length of a data line after it has been sanitized.
	* Entry name and maximum length can be different based on the particular file.
	* Positive = Valid
	* Zero = Empty
	* Negative = Too long

---

**./src/common/number-limits.js**
* Changed the following properties from ranges to maximum values:
	* nameLength
	* accentLength
	* dataLength

---

**./src/input/read-line-data.js**
* New file - Used to read and validate input data .txt files
