const fs = require("fs");
const papaParser = require("papaparse");
const path = require("path");

function csvToJsonConvert(pathFlag) {
  // csv file path
  const csvFilePath =
    pathFlag === "deliveries"
      ? path.resolve(__dirname, "../data/deliveries.csv")
      : path.resolve(__dirname, "../data/matches.csv");

  // Read the CSV file synchronously
  const csvData = fs.readFileSync(csvFilePath, "utf8");

  try {
    // function to convert the data into json synchronously
    const result = papaParser.parse(csvData, {
      header: true, // Treat the first row as headers
      skipEmptyLines: true, // Skip empty lines
      dynamicTyping: true, // Automatically convert data types (e.g., numbers)
    });
    // return Json data
    return result.data;
  } catch (error) {
    // catch operations
    throw error;
  }
}

module.exports = csvToJsonConvert;
