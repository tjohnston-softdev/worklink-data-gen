# Changelog

**./src/options-validation/list-entry-props.js**
* New file - Used to validate options for list entry mapping rows.
	* otherLanguages
	* checksClearances
	* personality
	* hobbies
	* gaming
	* allergies
	* fearsPhobias
	* technology
	* qualifications
	* experienceAreas
* This file only validates common properties for these objects:
	* pets
	* previousExperience

---

**./src/options-validation/pet-props.js**
* New file - Validates specific 'pet' child properties
	* minCount
	* maxCount

---

**./src/options-validation/prev-experience-props.js**
* New file - Validates specific 'previousExperience' child properties
	* minWorkAge
	* minLengthMonths
	* maxLengthMonths
	* ongoingChance

---

**./src/read-options-file.js**
* Added requirements:
	* ./options-validation/list-entry-props
	* ./options-validation/pet-props
	* ./options-validation/prev-experience-props
* Expanded 'callOptionsValidation' to include:
	* listEntryProps
	* petProps
	* prevExperienceProps
