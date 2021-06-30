// Gender characters for 'first-names.csv'

const nameGenderOptions =
{
	MALE: "M",
	FEMALE: "F",
	UNISEX: "U"
};


// Check if gender character is valid.
function getOptionExists(subjectChar)
{
	var checkRes = false;
	
	if (subjectChar === nameGenderOptions.MALE)
	{
		checkRes = true;
	}
	else if (subjectChar === nameGenderOptions.FEMALE)
	{
		checkRes = true;
	}
	else if (subjectChar === nameGenderOptions.UNISEX)
	{
		checkRes = true;
	}
	else
	{
		checkRes = false;
	}
	
	return checkRes;
}


module.exports =
{
	options: nameGenderOptions,
	getExists: getOptionExists
};