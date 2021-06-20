# Changelog

**./src/common/number-limits.js**
* Added 'aboutQuotes' range.
	* The amount of quotes that can be displayed in the About description.
	* Ranges from 1 to 100
	* Compare to 472 in the total set.

---

**./src/options-validation/basic-props.js**
* Wrote new function 'validateAboutProperty'
	* Used to validate the 'aboutQuotes' property.

---

**./src/options-validation/keyword-props.js - validateKeywordProperties**
* Added 'useChance' parameter.
* 'handleChanceProperty' is only called if 'useChance' is true.

---

**./src/read-options-file.js**
* Moved requirements:
	* 'keywordProps' to before 'rangeProps'
	* 'validationTasks' to before 'baseType'
* Added 'true' argument to pre-existing 'keywordProps' calls.
* Added the following to 'callOptionsValidation'
	* basicProps.validateAbout
	* 'keywordProps.validateKeywords' for 'skillDescription' (Required)
	* 'keywordProps.validateKeywords' for 'apperanceDescription' (Optional)
