const clear = require("clear");
const readOptionsFile = require("./src/read-options-file");


clear();
runGenerationMain();

function runGenerationMain()
{
	readOptionsFile(function (optionsTaskErr, optionsTaskRes)
	{
		if (optionsTaskErr !== null)
		{
			console.log(optionsTaskErr.message);
		}
		else if (optionsTaskRes.contents !== null)
		{
			console.log("Successful");
		}
		else
		{
			console.log("Does not exist");
		}
	});
}