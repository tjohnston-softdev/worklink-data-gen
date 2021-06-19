# Changelog

**./src/common/number-limits.js**
* Changed 'listEntries' maximum from 1000 to 50.
* Added 'feelsLikeOffset' range.
	* Decimal percentage for 'feelsLikeAge' range.
	* From 0 to 10
	* Up to 1000%

---

**./src/options-validation/basic-props.js**
* New file - Handles validation for 'options.json' properties:
	* supportWorkerCount
	* genders.*
	* minRegDate

---

**./src/read-options-file.js**
* Added requirement: './options-validation/basic-props'
* Added calls to 'basicProps' in 'callOptionsValidation'
* Removed capitalization from successful message in 'performOptionsFileRead'
