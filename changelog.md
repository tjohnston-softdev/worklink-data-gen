# Changelog

**./src/generate/person-datetime.js**
* Wrote new function 'addRegisterTimestamp'
	* Adds the register timestamp to the Support Worker entry object.
	* Formatted MySQL DATETIME string.
* Wrote new function 'addDateOfBirth'
	* Adds the Date of Birth to the Support Worker entry object.
	* Formatted MySQL DATE string.

---

**./src/generate-database-entries.js - coordinateGeneration**
* Added call to 'personDateTime.addRegister'
