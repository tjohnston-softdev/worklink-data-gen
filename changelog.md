# Changelog

**./src/generation/person-datetime.js - chooseRandomFeelsLikeAge**
* Declared 'numberGenerated' variable.
* Declared 'finalValue' variable.
	* 'baseValue' rounded to nearest whole.
* Replaced 'choiceRes' assignment with 'finalValue'
* The chosen 'feels like' age can no longer be the same as the chronological age.
	* If this is the case, null is returned.
