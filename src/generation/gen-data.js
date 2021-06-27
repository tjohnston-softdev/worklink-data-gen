function defineGeneratedDataObject()
{
	var defineRes = {};
	
	defineRes["baseEntries"] = [];
	defineRes["otherLanguages"] = [];
	defineRes["checks"] = [];
	defineRes["personality"] = [];
	defineRes["hobbies"] = [];
	defineRes["gaming"] = [];
	defineRes["avaliability"] = [];
	defineRes["allergies"] = [];
	defineRes["pets"] = [];
	defineRes["fears"] = [];
	defineRes["technology"] = [];
	defineRes["qualifications"] = [];
	defineRes["experienceAreas"] = [];
	defineRes["previousExperience"] = [];
	defineRes["other"] = [];
	
	return defineRes;
}

function defineBaseObject()
{
	var defineRes = {};
	
	defineRes["gender"] = null;
	defineRes["name"] = "";
	defineRes["register"] = null;
	defineRes["dateOfBirth"] = null;
	defineRes["chronoAge"] = -1;
	defineRes["feelsLikeAge"] = -1;
	
	return defineRes;
}




module.exports =
{
	defineResult: defineGeneratedDataObject,
	defineBase: defineBaseObject
};