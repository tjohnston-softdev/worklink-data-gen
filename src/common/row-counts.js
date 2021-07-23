/*
	* Defines number of rows defined in the corresponding database table.
	* Upper limit for Foreign Key ID.
*/

function defineRowCounts()
{
	var defineRes = {};
	
	defineRes["locations"] = 359;
	defineRes["cultures"] = 24;
	defineRes["referralSources"] = 18;
	defineRes["languages"] = 40;
	defineRes["checks"] = 14;
	defineRes["personalityTraits"] = 10;
	defineRes["hobbies"] = 150;
	defineRes["gaming"] = 10;
	defineRes["allergies"] = 8;
	defineRes["pets"] = 9;
	defineRes["fears"] = 20;
	defineRes["technology"] = 5;
	defineRes["qualifications"] = 13;
	defineRes["experienceAreas"] = 9;
	
	return defineRes;
}


module.exports = defineRowCounts();