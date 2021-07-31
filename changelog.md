# Changelog

**./src/common/**
* Added 'encryptionLength' property (number-limits.js)
* Wrote new function 'checkEncryptionStringValue' (validation-tasks.js)

---

**./src/options-validation/encrypt-props.js**
* New file - Validates encryption properties
	* enabled
	* key

---

**./src/read-options-file.js**
* Added requirement: './options-validation/encrypt-props'
* callOptionsValidation
	* Added call to 'encryptProps.validateEncryption'
