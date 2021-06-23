# Changelog

**./src/common/random-tasks.js**
* New function 'rollNumberRange'
	* Generates random integer in a given range.
* Renamed all result variables to 'outcomeRes'

---

**./src/common/validation-tasks.js**
* 'executionTimestamp' is now a millisecond number instead of a full date object.
* checkDateStringValue
	* Declared 'castDate' variable. Contains input cast to date object as-is.
	* Renamed 'timeValue' variable to 'origTime'
	* Declared 'roundTime' variable
		* Contains millisecond number for 'castDate'
		* This is after it has been rounded to the current date.
	* 'validDate' is now assigned based on 'roundTime'
	* Replaced 'dateOutcome.timestamp' with:
		* 'castDate' for preperation.
		* 'roundTime' for final validation.
	* 'dateOutcome.timestamp' is set to 'roundTime' if it is valid.

---

**./src/generation/person-datetime.js**
* New file - Contains functions to randomly generate a user's register date and age.
	* registerTimestamp
	* dateOfBirth
	* feelsLikeAge
* So far, only the register timestamp is generated.

---

**./src/generate-database-entries.js**
* Added requirement for: './generation/person-datetime'
* coordinateGeneration
	* The following variables are declared as null and will represent a 'dayjs' object:
		* currentDOB
		* currentRegister
	* 'currentRegister' is now assigned using 'personDateTime'
	* Added blank `console.log` before and after the loop.
	* 'currentRegister' is displayed as a string on each iteration.
