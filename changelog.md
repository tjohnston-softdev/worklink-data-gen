# Changelog

**./src/generate-database-entries.js**
* New file - Script used to generate Support Worker database entries.
* So far, this is only a template.
	* The loading spinner and loop is implemented.
	* No data is generated.
	* While the result object is defined and returned, it is empty.

---

**./src/generation/gen-data.js**
* New file - Defines result object for database entry generation.

---

**./generate.js**
* Added requirement for './src/generate-database-entries'
* Wrote new function 'executeGenerationTask'
	* Calls 'generateDatabaseEntries'
	* After 'executeInputDataTask'
	* Displays completion message.
