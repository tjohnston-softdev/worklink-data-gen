# Changelog

**./src/common/number-limits.js**
* Added new range 'keywords'
	* Sets limit for number of keywords in free text.
	* Mainly applies to the 'other' descriptions.
	* Ranges from 1 to 500

---

**./src/options-validation/keyword-props.js**
* New file - Handles validation for the 'other' options.
	* otherSpecific
	* otherGeneral

---

**./src/read-options-file.js**
* Added requirement: ./options-validation/keyword-props
* Expanded 'callOptionsValidation' to include 'keywordProps'
