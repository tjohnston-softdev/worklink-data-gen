# Changelog

**./src/common/keyword-data.js**
* New file - Defines object for keyword data retrieved from input files.

---

**./src/read-input-data.js**
* Added requirement: ./common/keyword-data"
* Split the series from 'performInputDataRead' into its own function 'coordinateData'
	* Removed property names.
	* Uncommented steps.
	* Updated function calls to use new parameters.
* callLineData
	* Added 'resultObj' and 'resultProp' parameters.
	* 'resultObj[resultProp]' is assigned with data upon successful return.
	* Successful callback returns true.
* callNameData
	* Added 'resultObj' parameter.
	* Changed series to use an array instead of an object.
	* 'resultObj.firstNames' is assigned with data upon successful return.
	* Successful callback returns true.

---

**./generate.js**
* Removed display from 'executeInputDataTask' successful result.
