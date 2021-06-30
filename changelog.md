# Changelog

**./src/common/validation-tasks.js**
* New function: 'writeStringTooLongErrorText'
	* Writes message for strings that are too long.
	* Can be added onto existing error messages, such as line streams.
	* "Example cannot be longer than x characters."
* Revised functions to use 'writeStringTooLongErrorText'
	* checkDataLineLengthNumber
	* checkDataEntryLengthNumber
	* checkNameLengthNumber
