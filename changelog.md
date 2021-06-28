# Changelog

**./src/generation/avail-roster.js - insertHours**
* Split 'currentHour' calculation into new function 'calculateDayHour'
	* Fixes offset error that causes negative hour values when the sequence number is a multiple of 24.
	* In these cases, zero is used as default. (Midnight)
