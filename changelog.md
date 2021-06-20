# Changelog

**./src/options-validation/swap-ranges.js**
* New file - Used to swap range limits for option properties.
	* If the minimum and maximum are out of order, they will be swapped.
* This takes place after all properties have been validated.

---

**./src/read-options-file.js**
* Added requirement for './options-validation/swap-ranges'
* 'swapRanges' is called after property validation is complete.

---

**./generate.js**
* If the options file is successfully read, the retrieved object will be displayed.
