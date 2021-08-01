// Writes description for experience areas.


// Main function.
function getExperienceDescription(expRatingNum)
{
	var descRes = "";
	
	descRes += "I ";
	descRes += parseRating(expRatingNum);
	descRes += " in this particular area.";
	
	return descRes;
}


// Converts rating to string.
function parseRating(expNum)
{
	var levelRes = "";
	
	if (expNum > 0 && expNum <= 10)
	{
		levelRes = "have basic experience";
	}
	else if (expNum > 20 && expNum <= 40)
	{
		levelRes = "have some experience";
	}
	else if (expNum > 40 && expNum <= 60)
	{
		levelRes = "am moderately experienced";
	}
	else if (expNum > 60 && expNum <= 80)
	{
		levelRes = "am highly experienced";
	}
	else if (expNum > 80 && expNum <= 100)
	{
		levelRes = "am an expert";
	}
	else
	{
		levelRes = "have uncertain experience";
	}
	
	return levelRes;
}



module.exports =
{
	getDescription: getExperienceDescription
};