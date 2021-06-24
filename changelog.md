# Changelog

**./src/generation/person-sensitive.js**
* Wrote new function 'chooseRandomPassword'
	* Writes random string for user password.
	* Random length specified by options.

---

**./src/generation/person-datetime.js - addDateOfBirth**
* Replaced 'regTime' with 'dobObject'

---

**./src/generate-database-entries.js - coordinateGeneration**
* Added calls to:
	* personSensitive.choosePassword
	* personDateTime.addDOB
* Added 'currentFeelsAge' to 'currentParent'
