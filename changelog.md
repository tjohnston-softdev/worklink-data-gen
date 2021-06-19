# Changelog

**./src/common/fs-errors.js**
* New function: 'writeFileCreateError'
	* Error text for creating files.
	* Mainly intended for 'fs.writeFile'
	* Might not be used for output streaming.

---

**./src/create-options-file.js**
* New file - Script for creating an empty 'options.json' file.
* Called when said file does not exist.

---

**./generate.js**
* Added requirement for './src/create-options-file'
* Wrote new function 'executeOptionsCreateTask'
	* Calls 'create-options-file' script.
* Changes to 'runGenerationMain'
	* If 'options.json' does not exist, 'executeOptionsCreateTask' is called.
	* Added exit calls to other cases.
