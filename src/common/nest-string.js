function getNestString(vParent, vChild)
{
	var stringRes = [vParent, vChild].join(".");
	return stringRes;
}


module.exports =
{
	get: getNestString
};