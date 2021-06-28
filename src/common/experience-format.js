function getExperienceDescription(expRatingNum)
{
	var descRes = "";
	
	descRes += "I have ";
	descRes += parseRating(expRatingNum);
	descRes += " experience in this particular area.";
	
	return descRes;
}


function parseRating(expNum)
{
	var levelRes = "";
	
	if (expNum > 0 && expNum <= 10)
	{
		levelRes = "basic";
	}
	else if (expNum > 20 && expNum <= 40)
	{
		levelRes = "some";
	}
	else if (expNum > 40 && expNum <= 60)
	{
		levelRes = "moderate";
	}
	else if (expNum > 60 && expNum <= 80)
	{
		levelRes = "high";
	}
	else if (expNum > 80 && expNum <= 100)
	{
		levelRes = "extensive";
	}
	else
	{
		levelRes = "an unknown amount of";
	}
	
	return levelRes;
}



module.exports =
{
	getDescription: getExperienceDescription
};