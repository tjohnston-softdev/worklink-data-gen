# Changelog

**./options.json**
* Added new child object 'userPassword'
	* Includes 'minCharacters' and 'maxCharacters'
	* Affects length of password.

---

**./src/common/number-limits.js**
* Added 'passwordLength' range.
	* Up to 100 characters.

---

**./src/options-validation/range-props.js**
* Wrote new function 'validatePasswordLengthProperties'
	* Primary function validates 'userPassword' object.
* Wrote new function 'handlePasswordLengthNumber'
	* Secondary function validates character count number.

---

**./src/read-options-file.js - callOptionsValidation**
* Added call to 'rangeProps.validatePasswordLength' after 'ageProps'
