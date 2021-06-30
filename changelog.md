# Changelog

**./src/generation/avail-roster.js**
* allocateBlock
	* Added 'tgtCount' parameter.
	* When allocating a block, the number of hours will never exceed the total target.
	* Revised loop header comment to clarify end conditions.
* chooseHours
	* Added 'targetCount' argument to 'allocateBlock' call.
