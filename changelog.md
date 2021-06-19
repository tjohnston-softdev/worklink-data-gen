# Changelog

**./src/common/validation-tasks.js**
* Wrote function 'initializeErrorText'
	* Writes option property name in quotation marks.
	* Includes optional text to include after quotation.
	* Used to begin string when writing error text.
* Wrote function 'appendRangeNumbers'
	* Appends range numbers to corresponding error text.
	* eg. "Between x and y"
* Error text functions:
	* writeBooleanErrorText
	* writeArrayErrorText
	* writeNumberErrorText
	* writeNumberTooLargeErrorText
	* writeNumberRangeErrorText
	* writeDecimalRangeErrorText
	* writePercentageErrorText
	* writeDateErrorText
	* writeDayWeightCountError
* All validation functions use their corresponding error text except for 'checkOffsetValue'
	* Uses a placeholder message for now.
