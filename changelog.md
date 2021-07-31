# Changelog

**./options.json**
* Added 'encryption.checkMatch' property.
	* If this is True, check whether the encrypted values match their original counterparts.

---

**./src/options-validation/encrypt-props.js**
* Wrote 'handleTrueFalseValue' function.
* Removed 'handleEnabledStatus' function.
* validateEncryptionProperties
	* Replaced 'handleEnabledStatus' call with 'handleTrueFalseValue' for 'enabled'
	* Added 'handleTrueFalseValue' call for 'checkMatch'
