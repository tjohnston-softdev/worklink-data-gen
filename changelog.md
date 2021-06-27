# Changelog

**./src/generation/foreign-key-lists.js**
* Wrote new functions:
	* mapPets
		* Coordinates population of the 'SupportWorkerPets' table.
	* insertPets
		* Inserts entries into 'SupportWorkerPets'
		* Generates individual count during loop.
* Added call to 'mapPets' in 'generateListEntries'
