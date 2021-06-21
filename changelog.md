# Changelog

**./src/common/nest-string.js**
* New file - Used to write nest string for parent and child option properties.
	* "parent.child"
* Derived from: `../options-validation/list-entry-props.js`

---

**./src/options-validation/list-entry-props.js**
* Moved the 'getNestString' function into: '../common/nest-string.js'
	* This file has been added as a requirement.
* Replaced 'getNestString' calls with 'nestString.get'
* Renamed 'nestString' variable to 'propString' in functions:
	* handleChancePercentage
	* handleRangeNumber
	* handleTrueFalse

---

**./src/options-validation/keyword-props.js**
* Added requirement for: '../common/nest-string.js'
* handleChanceProperty
	* Renamed the 'nestString' variable to 'propString'
* handleKeywordProperty
	* Renamed the 'nestString' variable to 'propString'
	* 'propString' is now assigned using 'nestString.get'

---

**./src/options-validation/age-props.js - handleAgeNumber**
* Renamed 'nestString' variable to 'propString'

---

**./src/options-validation/basic-props.js - handleGenderPercentage**
* Renamed 'nestString' variable to 'propString'

---

**./src/options-validation/pet-props.js - handleCountNumber**
* Renamed 'nestString' variable to 'propString'

---

**./src/options-validation/prev-experience-props.js - handleRangeNumber**
* Renamed 'nestString' variable to 'propString'

---

**./src/options-validation/range-props.js**
* Renamed 'nestString' variable to 'propString' in functions:
	* handleTimeNumber
	* handleViewNumber
