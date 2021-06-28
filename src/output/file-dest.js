const fs = require("fs");


function prepareOutputFolder(targetPath, folderCallback)
{
	var optsObj = {recursive: true};
	
	fs.mkdir(targetPath, optsObj, function(folderErr)
	{
		if (folderErr !== null)
		{
			return folderCallback(new Error("Error creating output folder."), null);
		}
		else
		{
			return folderCallback(null, true);
		}
	});
}



module.exports =
{
	prepareFolder: prepareOutputFolder
};