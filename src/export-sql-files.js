const series = require("run-series");
const ora = require("ora");
const storedPaths = require("../storage-paths");
const fileDest = require("./output/file-dest");
const fileWrite = require("./output/file-write");


function performSqlExport(genData, sqlExportCallback)
{
	var exportSpinner = ora("Exporting Data").start();
	
	series(
	[
		fileDest.prepareFolder.bind(null, storedPaths.outputFolder),
		fileWrite.saveSql.bind(null, storedPaths.outputFolder, "01-support_worker.sql", "SupportWorker", genData.baseEntries)
	],
	function (overallErr, overallRes)
	{
		if (overallErr !== null)
		{
			exportSpinner.fail("Error exporting data");
			return sqlExportCallback(overallErr, null);
		}
		else
		{
			exportSpinner.succeed("Data exported");
			return sqlExportCallback(null, true);
		}
	});
}



module.exports = performSqlExport;