# Changelog

**./src/common/random-tasks.js**
* New function 'rollArrayElement'
	* Chooses random array element based on length.
	* Random seed multiplied by length, rounding down.

---

**./src/generation/person-first_name.js**
* New file - Chooses random first name based on gender.
* Includes debug function to retrieve gender string from flag.

---

**./src/generate-database-entries.js**
* Added requirement for './generation/person-first_name'
* coordinateGeneration
	* Renamed 'currentGender' variable to 'currentGenderFlag'
	* Declared new variable 'currentGenderString'
	* 'currentGenderString' and 'currentName' are:
		* Assigned using 'personFirstName'
		* Displayed on loop.
	* Added blank `console.log` before the loop starts.

---

**./src/read-input-data.js - coordinateData**
* Commented out 'callLineData' tasks.
