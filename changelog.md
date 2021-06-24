# Changelog

**./src/generation/written-descriptions.js**
* composeText
	* Result string is now "DESCRIPTION" instead of 'fullDesc'
* writeOptionalString
	* If description is skipped, an empty string is added to 'parentObject'
* writeAccentString
	* New function
	* Chooses random accent.
	* While this does not write a description, it uses the same keyword mechanics.

---

**./src/read-input-data.js - coordinateData**
* All tasks are commented out except for 'accents'

---

**./src/generate-database-entries.js - coordinateGeneration**
* Added calls:
	* 'writtenDescriptions.writeAccent' for 'spokenAccent'
	* 'personInt.chooseID' for 'culturalBackgroundID'
