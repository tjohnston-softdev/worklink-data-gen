# Changelog

**./src/common/validation-tasks.js**
* Declared 'execTime' global variable.
	* Timestamp when the program started executing.
	* Used for register date validation.
	* Future register timestamps are not allowed.
* checkDateStringValue
	* Declared 'timeParsed' variable.
	* Changed `Number.isInteger` variable from 'checkRes' to 'timeParsed'
	* Revised final validation:
		* If a future timestamp is entered, an error will be shown.
		* Non-future timestamps are valid.
		* Invalid timestamp strings will raise an error as before.
