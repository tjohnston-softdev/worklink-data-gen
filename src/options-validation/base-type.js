// Validates and prepares base options object.


// Object type.
function validateBaseType(optionsObject, resultObject)
{
	var typeStr = typeof optionsObject;
	var correctType = false;
	
	if (optionsObject !== undefined && optionsObject !== null && typeStr === "object")
	{
		correctType = true;
	}
	else
	{
		resultObject.valid = false;
		resultObject.errorMessage = "Generation options must be a valid JSON object.";
	}
	
	return correctType;
}


// Initialize nested objects.
function setNestedObjectProperties(optionsObject)
{
	defineObject(optionsObject, "genders");
	defineObject(optionsObject, "age");
	defineObject(optionsObject, "travelTime");
	defineObject(optionsObject, "viewsPerDay");
	defineObject(optionsObject, "otherLanguages");
	defineObject(optionsObject, "checksClearances");
	defineObject(optionsObject, "personality");
	defineObject(optionsObject, "hobbies");
	defineObject(optionsObject, "gaming");
	defineObject(optionsObject, "allergies");
	defineObject(optionsObject, "pets");
	defineObject(optionsObject, "fearsPhobias");
	defineObject(optionsObject, "technology");
	defineObject(optionsObject, "qualifications");
	defineObject(optionsObject, "experienceAreas");
	defineObject(optionsObject, "previousExperience");
	defineObject(optionsObject, "availability");
	defineObject(optionsObject, "otherSpecific");
	defineObject(optionsObject, "otherGeneral");
}


// Adds child object property if it does not exist.
function defineObject(parentObj, propName)
{
	var existVal = parentObj[propName];
	
	if (existVal === undefined || existVal === null)
	{
		parentObj[propName] = {};
	}
}



module.exports =
{
	validateType: validateBaseType,
	setNestedObjects: setNestedObjectProperties
};