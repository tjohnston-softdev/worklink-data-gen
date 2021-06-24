# Changelog

**./src/common/row-counts.js**
* Added return to definition.

---

**./src/generation/person-int.js**
* New file - This will contain functions to generate integer values for 'SupportWorker'
* So far, it only generates a foreign key ID.

---

**./src/generate-database-entries.js**
* Added new requirements:
	* ./generation/person-int
	* ./common/row-counts
* coordinateGeneration
	* Added call to 'personInt.chooseID' after 'currentFeelsAge' is added.
