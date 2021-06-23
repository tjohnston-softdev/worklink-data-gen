# Changelog

**./src/common/random-tasks.js**
* Renamed result variables from 'outcomeRes'
	* rollPercentageChance = percOutcomeRes
	* rollArrayElement = indOutcomeRes
	* rollIntegerRange = numOutcomeRes
	* rollDecimalRange = numOutcomeRes
* New function 'rollDigitCharacter'
	* Generates a random digit (0-9)
	* Uses 'rollArrayElement ' as a basis.
* New function 'rollKeyboardCharacter'
	* Generates a random character on the keyboard.
	* Alphabet, numbers, and symbols. (No spaces)
	* Uses 'rollIntegerRange ' as a basis.
	* Returns a unicode character (33 - 126)

---

**./src/generate/person-sensitive.js**
* New file - Used to generate sensitive information.
* writeEmailAddressString
	* Writes an E-Mail address by combining the first name and the account ID.
	* This is not randomly generated per se but it is still unique.
* chooseRandomDriversLicenseNumber
	* Writes drivers license number.
	* Consists of 10 digits.
* chooseRandomPhoneNumber
	* Writes random phone number.
	* Similar to drivers license number, except they always start with "04"

---

**./src/generate-database-entries.js**
* Added requirement for './generation/person-sensitive'
* coordinateGeneration
	* Added calls to 'personSensitive':
		* writeEmailAddress
		* chooseDriversLicenseNumber
		* choosePhoneNumber
	* Added local variables to 'currentParent' after phone number.
		* currentName
		* currentGender
