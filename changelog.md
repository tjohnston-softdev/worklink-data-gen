# Changelog

**./options.json**
* Removed 'userPassword'
	* Password length will always be between 8 and 32.
	* This was the default length range.

---

**./src/read-options-file.js - callOptionsValidation**
* Removed call to 'rangeProps.validatePasswordLength'

---

**./src/options-validation/range-props.js**
* Removed functions:
	* validatePasswordLengthProperties
	* handlePasswordLengthNumber

---

**./src/common/number-limits.js**
* Removed 'passwordLength' result property.

---

**./src/generate-database-entries.js**
* Removed 'genOpts.userPassword' argument from 'choosePassword' call.

---

**./src/generation/person-sensitive.js - chooseRandomPassword**
* Removed 'passOpts' parameter.
* Replaced 'passOpts.minCharacters' with 8.
* Replaced 'passOpts.maxCharacters' with 32.

---

**./generate.js - runGenerationMain**
* Commented out call to 'executeInputDataTask'
* On successful result, display "Valid" message.
