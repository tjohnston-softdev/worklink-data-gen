# Changelog

**./src/common/date-format.js**
* New file - Used to format date-time objects (dayjs)
	* Full timestamp
	* Date only

---

**./src/generation/person-datetime.js**
* Added requirement for '../common/date-format'
* Replaced 'format' with calls to 'dateFormat' in functions:
	* addRegisterTimestamp
	* addDateOfBirth

---

**./src/generation/prev-experience.js**
* Added requirement for '../common/date-format'
* Replaced calls to 'format' with 'dateFormat.dateOnly'
