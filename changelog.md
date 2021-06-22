# Changelog

**./src/common/random-tasks.js**
* New file - Used to help generate random data.
* So far, only has a function to roll percentages.

---

**./src/generation/person-gender.js**
* New file - Chooses gender at random.

---

**./src/generate-database-entries.js**
* Added requirement: './generation/person-gender'
* coordinateGeneration
	* 'currentGender' is assigned using 'personGender'
	* 'currentGender' is output to console during loop.
	* Loop cutoff changed from 'genOptsObj.supportWorkerCount' to 10
	* Swapped 'currentDOB' and 'currentRegister' order.
