// problem5: Find the number of times each team won the toss and also won the match

// import the required modules
const csvToJsonConverter = require("../utils/csvToJson");
const outputStoreFunction = require("../utils/dataToFileFunction");

// Function to get the teams with both toss and match winning
function getTeamsWonTossAndMatchBoth() {
  // To get the matches data
  const matchesData = csvToJsonConverter("matches");

  if (Array.isArray(matchesData)) {
    // To initialize the teams array

    const teamsWonBothTossMatch = {};

    // Iterate the matches data to find the get all counts if team win with matches
    for (let index = 0; index < matchesData.length; index++) {
      // To get match data
      const match = matchesData[index];

      // Validate both toss winner and match winner
      if (match.winner === match.toss_winner) {
        // If team is not present in the data then initialize it in object form
        if (!teamsWonBothTossMatch[match.toss_winner]) {
          teamsWonBothTossMatch[match.toss_winner] = {
            totalWinBothTossAndMatch: 0,
          };
        }

        // Above condition not satisfied then execute it
        teamsWonBothTossMatch[match.toss_winner].totalWinBothTossAndMatch++;
      }
    }

    // Find out data into the file with function
    outputStoreFunction(
      teamsWonBothTossMatch,
      "teamWonTheTossAndAlsoWonTheMatch"
    );
  } else {
    console.log("Matches Data is not a Valid array format");
  }
}

// Invoke the function to be executed
getTeamsWonTossAndMatchBoth();
