# Changelog

**./src/read-input-data.js**
* New file - Script used to read the text files in 'input-data'
	* While the basic structure is there, only 'academic-subjects.txt' is read for now.
	* This is due to a problem with the 'run-series' library in comparison to full 'async'

---

**./generate.js**
* Added requirement: ./src/read-input-data
* Wrote new function 'executeInputDataTask'
	* Used to run 'callInputData'
	* Called after 'readOptionsFile' is successful.
	* Number of retrieved academic subjects is displayed on success.
