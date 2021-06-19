# Changelog

**./src/common/validation-tasks.js**
* Wrote new function 'defineResultObject'
	* Creates validation result object.
	* Called publicly as 'defineResult'

---

**./src/read-options-file.js**
* New file - Script used to read and validate options file.
* Implemented:
	* Checks if the file exists.
	* Validates size
	* Opens and parses the file itself.
	* Base type validation
	* Initialize nested objects.
	* Overall structure.
* Individual property validation has not been called yet.

---

**./generate.js**
* Started writing the main script.
	* Clears console first.
	* Calls 'read-options-file.js'
	* Displays message depending on outcome.
