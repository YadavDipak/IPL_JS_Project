// imported Data
const csvToJsonConverter = require("../utils/csvToJson");
const outputStoreFunction = require("../utils/dataToFileFunction");

function getMatchesWonPerTeamPerYear() {
  const matchesData = csvToJsonConverter("matches");

  // To check the
  if (Array.isArray(matchesData)) {
    // To store the result
    const matchesWonPerTeamPerYear = {};

    // Iterating the data
    for (let index = 0; index < matchesData.length; index++) {
      const match = matchesData[index];

      // To check the result
      const result = matchesData.result;

      // To check the result
      if (result != "no result") {
        // To fetch the winner
        const winner = match.winner;

        // To fetch the season
        const season = match.season;

        // If this is a new season
        if (!matchesWonPerTeamPerYear[season]) {
          // If year not included then create an object
          matchesWonPerTeamPerYear[season] = {};

          // Check for the new winner team
          if (!matchesWonPerTeamPerYear[season][winner]) {
            matchesWonPerTeamPerYear[season][winner] = { TotalWinInYear: 0 };
          }
        } else if (!matchesWonPerTeamPerYear[season][winner]) {
          matchesWonPerTeamPerYear[season][winner] = {
            TotalWinInYear: 0,
          };
        }
        // Increase the win count particular team
        matchesWonPerTeamPerYear[season][winner].TotalWinInYear++;
      }
    }

    // Write the data into output file
    outputStoreFunction(matchesWonPerTeamPerYear, "matchesWonPerTeamPerYear");
  } else {
    console.log("Matches data is not an valid array");
  }
}

getMatchesWonPerTeamPerYear();
