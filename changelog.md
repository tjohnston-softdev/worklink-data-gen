# Changelog

**./src/common/fs-errors.js**
* New function: 'writeFileReadError'
	* Writes error text for reading files.
	* Can work for both 'fs' and 'line-by-line' modules.
* New function: 'writeJsonParseError'
	* Writes error text for JSON parsing.

---

**./src/input/parse-options.js**
* New file - Used to parse 'options.json'

---

**./options.json**
* Fixed missing comma syntax error between 'previousExperience' and 'availability'
