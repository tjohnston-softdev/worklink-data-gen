# Changelog

**./src/generation/person-video.js**
* New file - Generates YouTube video ID
* 11 characters consisting of:
	* Letters
	* Numbers
	* Dashes
	* Underscores
* If this is skipped, null is returned.

---

**./src/generate-database-entries.js**
* Added requirement: './generation/person-video'
* Added call to 'personVideo' in 'coordinateGeneration'
