# Changelog

**./src/common/validation-tasks.js**
* checkOffsetValue
	* Added 'rangeObj' parameter.
	* 'writeDecimalRangeErrorText' is called for error text.
	* 'rangeObj' properties are used for range validation instead of literal numbers.
* writeDecimalRangeErrorText
	* While this function was written previously to use range objects, it is only being used now by the corresponding validation task.
* Merged functions:
	* 'writeBooleanErrorText' into 'checkBooleanValue'
	* 'writeArrayErrorText' into 'checkDayWeightsArrayValue'
	* 'writePercentageErrorText' into 'checkPercentageValue'
	* 'writeDayWeightCountError' into 'checkDayWeightsArrayValue'
* Replaced 'quoteProperty' calls with 'initializeErrorText'
* Added public properties.
