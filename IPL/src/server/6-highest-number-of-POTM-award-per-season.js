// problem:6 Find a player who has won the highest number of Player of the Match awards for each season

// import the required modules
const csvToJsonConverter = require("../utils/csvToJson");
const outputStoreFunction = require("../utils/dataToFileFunction");

// Function to get all the players with the highest number of Player of the Match awards in each season
function getPlayersHighestNumberOfPOTMAwardPerSeason() {
  // Get the matches data in JSON format
  const matchesData = csvToJsonConverter("matches");

  // Check if match data is in an array format
  if (Array.isArray(matchesData)) {
    // Initialize an object to store the output
    const highestPOTMPerSeason = {};

    // Single loop to process matches and find the top player for each season
    for (let index = 0; index < matchesData.length; index++) {
      const match = matchesData[index];
      const season = match.season;
      const playerOfTheMatch = match.player_of_match;

      if (playerOfTheMatch) {
        // Initialize season entry if not already present
        if (!highestPOTMPerSeason[season]) {
          highestPOTMPerSeason[season] = {
            playerName: playerOfTheMatch,
            totalPOTM: 1,
            playerCounts: { [playerOfTheMatch]: 1 },
          };
        } else {
          const seasonData = highestPOTMPerSeason[season];

          // Update the player's POTM count
          if (!seasonData.playerCounts[playerOfTheMatch]) {
            seasonData.playerCounts[playerOfTheMatch] = 0;
          }
          seasonData.playerCounts[playerOfTheMatch]++;

          // Check if this player has the highest POTM count for the season
          if (
            seasonData.playerCounts[playerOfTheMatch] > seasonData.totalPOTM
          ) {
            seasonData.playerName = playerOfTheMatch;
            seasonData.totalPOTM = seasonData.playerCounts[playerOfTheMatch];
          }
        }
      }
    }

    // Remove the playerCounts object before outputting the data
    for (const season in highestPOTMPerSeason) {
      delete highestPOTMPerSeason[season].playerCounts;
    }

    // Output the data to a file
    outputStoreFunction(
      highestPOTMPerSeason,
      "highestNumberOfPOTMAwardPerSeason"
    );
  } else {
    console.log("Given match data is not in a valid array format.");
  }
}

// Invoke the function
getPlayersHighestNumberOfPOTMAwardPerSeason();
