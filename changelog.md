# Changelog

**./src/output/**
* New folder - Contains functions for exporting generated data.
	* 'file-dest.js' - Prepares output folder.
	* 'file-write.js' - Writes and saves SQL file containing INSERT command.

---

**./src/export-sql-files.js**
* New file - Exports generated data to SQL files.

---

**./generate.js**
* Added requirement for: './src/export-sql-files'
* Wrote new function 'executeOutputTask'
	* Runs the 'exportSqlFiles' script.
	* Called after 'executeGenerationTask'
	* Last script in the program.
