# Changelog

**./src/options-validation/**
* New files:
	* 'age-props.js' - Validates 'age' child object.
	* 'base-chance-props.js' - Validates 'baseChances' child object.
	* 'day-props.js' - Validates 'interviewDayWeights' array.
	* 'range-props.js' - Validates child objects:
		* travelTime
		* viewsPerDay

---

**./src/read-options-file.js - Requirements **
* Added requirements:
	* ./options-validation/age-props
	* ./options-validation/range-props
	* ./options-validation/base-chance-props
	* ./options-validation/day-props
* Removed the 'run-series' requirement.
* Expanded 'callOptionsValidation' to include:
	* ageProps
	* rangeProps
	* chanceProps
	* dayProps
* Swapped function calls:
	* basicProps.validateGenders
	* basicProps.validateMinRegisterDate
