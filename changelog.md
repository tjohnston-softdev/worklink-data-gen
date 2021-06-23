# Changelog

**./src/read-input-data.js**
* Commented out 'callNameData' task.
	* In short, all file read tasks are commented out for now.

---

**./src/generate-database-entries.js - coordinateGeneration**
* Removed 'currentGenderString' variable.
* Renamed 'currentGenderFlag' variable to 'currentGender'
* Commented out the 'personFirstName.chooseRandom' call.
* Removed `console.log`

---

**./src/common/validation-tasks.js**
* execTime
	* Renamed to 'executionTimestamp'
	* Now a full date object instead of a number.
	* The validation itself remains unchanged.
	* Used publicly as 'execTimestamp'
* checkDateStringValue
	* Declared 'dateOutcome' object.
		* Merges 'checkRes' and 'parsedDateObject'
		* Now returned instead of 'checkRes'
	* Declared 'validDate' variable.
	* If 'timeParsed' is true:
		* 'dateOutcome.timestamp' is rounded to the current date at midnight. (UTC)
		* 'validDate' is true.
	* Replaced variables in the validation IF structure:
		* 'timeParsed' with 'validDate'
		* 'timeValue' with 'parsedDateObject'
	* Replaced future error text
		* Before: "cannot take place in the future"
		* After: "cannot be a future date"

---

**./src/options-validation/basic-props.js - validateMinRegisterDateString**
* Declared 'dateResult' variable.
	* Starts as an empty object.
	* Consumes result of 'checkDateString' call.
* If validation is successful, the options value will be replaced with a full date object.
	* Keep in mind that the object is rounded to the current date.
* 'optionsObject.minRegDate' is logged to console regardless of the result.
