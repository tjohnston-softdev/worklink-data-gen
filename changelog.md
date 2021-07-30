# Changelog

**./options.json**
* Added new properties:
	* 'encryption.enabled' - Whether personal information fields will be encrypted.
	* 'encryption.key' - Chosen encryption key.

---

**./src/options-validation/base-type.js - setNestedObjectProperties**
* Added 'defineObject' calls for:
	* encryption
	* skillDescription
	* apperanceDescription
	* baseChances
