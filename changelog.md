# Changelog

**./src/common/random-tasks.js**
* Renamed 'rollNumberRange' to 'rollIntegerRange'
* New function 'rollDecimalRange'
	* Generates random decimal between given numbers.
	* Similar to 'rollIntegerRange' but without the rounding.

---

**./src/generation/person-datetime.js**
* New function 'chooseRandomDOB'
	* Generates random Date of Birth for support worker.
	* Between minimum and maximum age.
	* Age limits are as of when they registered, not present-day.
* New function 'calculateChronoAge'
	* Retrieves age from Date of Birth.
	* Difference in years between DOB and execution time.
* New function 'chooseRandomFeelsLikeAge'
	* Chooses a 'feels like' age.
	* This is offset from the chronological age.

---

**./src/generate-database-entries.js - coordinateGeneration**
* Removed `console.log` for 'currentRegister'
* Assigned the following variables using 'personDateTime'
	* currentDOB
	* currentChronoAge
	* currentFeelsAge
* Added `console.log` for newly assigned variables.
