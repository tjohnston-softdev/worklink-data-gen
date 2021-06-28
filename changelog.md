# Changelog

**./src/common/experience-format.js**
* New file - Writes descriptions for experience areas.
	* Internal rating is given out of 100.
	* Rating is parsed into experience description.
	* Strings are hard-coded instead of selected from input data.

---

**./src/generation/foreign-key-lists.js**
* Added requirement for '../common/experience-format'
* Moved 'experienceAreas' mapping into its own function 'mapExperienceAreas'
	* Contents are still required.
	* Expanded so that the description column can be populated.
	* Inserted with new function: 'insertExperienceAreas'
