# Changelog

**./src/generate-database-entries.js**
* generateAccount
	* Appended two extra values to 'accountObject' representing columns:
		* availableFlag
		* activeFlag
* generateOther
	* Appended extra value to 'otherObject', representing 'activeFlag'

---

**./src/generation/**
* Change:
	* Added extra value to 'currentRow', representing 'activeFlag'
* Affected:
	* avail-roster.js
		* insertHours
	* prev-experience.js
		* chooseJobs
	* foreign-key-lists.js
		* insertGeneral
		* insertExperienceAreas
		* insertPets
