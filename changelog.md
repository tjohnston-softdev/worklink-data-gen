# Changelog

**./src/generation/person-int.js**
* Added requirements:
	* dayjs
	* ../common/validation-tasks
* Wrote new functions:
	* chooseRandomViewsCount
		* Primary function
		* Chooses random profile view count.
		* Multiplied by the age of the account in days.
		* 'viewsPerDay' affects average views per day.
	* getDaysActive
		* Secondary function.
		* Retrieves days since account register.
		* Age is as of execution time.

---

**./src/generate-database-entries.js - coordinateGeneration**
* Added call to 'personInt.chooseViews'
