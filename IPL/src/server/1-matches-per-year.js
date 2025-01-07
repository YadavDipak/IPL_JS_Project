// import the required modules
const csvToJsonConverter = require("../utils/csvToJson");
const outputDataInFileFunction = require("../utils/dataToFileFunction");

function getNumberOfMatchesPerYear() {
  // get the matches object using the converter
  const matchesData = csvToJsonConverter("matches");

  if (Array.isArray(matchesData)) {
    // Initializing the total matches per year
    const totalMatchesPerYear = {};

    // Iterating on data to get the total ipl matches per year
    for (let index = 0; index < matchesData.length; index++) {
      const match = matchesData[index];

      // Create an object with value 0
      if (!totalMatchesPerYear[match.season]) {
        totalMatchesPerYear[match.season] = { totalMatches: 0 };
      }

      // Increment the counter of matches that particular year
      totalMatchesPerYear[match.season].totalMatches++;
    }

    // Write the data into output file
    outputDataInFileFunction(totalMatchesPerYear, "matchesPerYear");
  } else {
    console.log("Matches data is not a valid array.");
  }
}

// Invoke the function to output
getNumberOfMatchesPerYear();
