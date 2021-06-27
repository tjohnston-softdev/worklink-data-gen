const dayjs = require("dayjs");


function getFull(tsObject)
{
	var formatRes = tsObject.format("YYYY-MM-DD HH:mm:ss");
	return formatRes;
}


function getDateOnly(tsObject)
{
	var formatRes = tsObject.format("YYYY-MM-DD");
	return formatRes;
}


module.exports =
{
	full: getFull,
	dateOnly: getDateOnly
};