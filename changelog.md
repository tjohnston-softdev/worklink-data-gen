# Changelog

**./src/common/fs-errors.js**
* New file - Writes error text for file-system related tasks.
* Supported cases:
	* Checking file exists.
	* File too large.
	* File empty.
	* File not valid.
* Parses the 'fs' error code into a readable description.

---

**./src/input/check-file-exists.js**
* New file - Checks whether an input file exists.
* Has separate functions for the options file, and input data.
	* 'options.json' is optional.
	* It will be handled differently
* If the file exists, the size will be validated accordingly.
