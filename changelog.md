# Changelog

**./src/common/random-tasks.js**
* Declared global variable 'specialChars'
	* Stores special characters used for passwords.
	* Uses a string instead of ASCII character numbers.
* Wrote new functions:
	* rollUppercaseCharacter
	* rollLowercaseCharacter
	* rollSpecialCharacter
* Removed the 'rollKeyboardCharacter' function.
* Changed "numbers" to "values" in file header comment.

---

**./src/generation/person-password.js**
* New file
	* Standalone script used to generate Support Worker account passwords.
	* Conforms to server-side password validation.

---

**./src/generation/person-sensitive.js**
* Removed the 'chooseRandomPassword' function.

---

**./src/generate-database-entries.js**
* Added requirement for './generation/person-password'
* Replaced 'personSensitive.choosePassword' with 'personPassword.chooseString'
