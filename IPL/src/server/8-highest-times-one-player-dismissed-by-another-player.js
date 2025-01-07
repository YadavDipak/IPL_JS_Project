// Problem 8: Find the highest number of times one player has been dismissed by another player

// Import the required modules
const csvToJsonConverter = require("../utils/csvToJson");
const outputStoreFunction = require("../utils/dataToFileFunction");

// Function to get most dismissed player by another player
function getMostDismissedPlayerByAnother() {
  // To get the deliveries data using converter
  const deliveriesData = csvToJsonConverter("deliveries");

  // Validate deliveries data to check array or not
  if (Array.isArray(deliveriesData)) {
    // Initialize the data to get all the dismissed players data
    const dismissedPlayersData = {};

    // Iterate the data to get the bowlers name and dismissed batsman
    for (const delivery of deliveriesData) {
      // To get the dismissed player, bowler name and dismissed kind
      const playerDismissed = delivery.player_dismissed;
      const bowlerName = delivery.bowler;
      const dismissalKind = delivery.dismissal_kind;

      // To check player dismissal goes to in bowler hand or not
      if (playerDismissed && dismissalKind != "run out") {
        if (!dismissedPlayersData[playerDismissed]) {
          // Initialize the object for the dismissed player
          dismissedPlayersData[playerDismissed] = {};

          // Initialize the count by zero for first dismissal
          dismissedPlayersData[playerDismissed][bowlerName] = {
            totalDismissal: 0,
          };
        } else if (!dismissedPlayersData[playerDismissed][bowlerName]) {
          // Initialize the new dismissal for new batsman
          dismissedPlayersData[playerDismissed][bowlerName] = {
            totalDismissal: 0,
          };
        }

        // Increase that dismissal for particulat batsman and bowler
        dismissedPlayersData[playerDismissed][bowlerName].totalDismissal++;
      }
    }

    // Initialize an variable to count the dismissal
    let mostDismissedPlayerCount = 0;

    // Initialize dismissedPlayerData to get most dismissal by a bowler for particular one player
    for (const player in dismissedPlayersData) {
      // To get all the list of dismissals of players list
      const bowlersListData = dismissedPlayersData[player];

      // Iterate on data bowlers list
      for (const bowler in bowlersListData) {
        // To get the dismissal data
        const dismissalData = bowlersListData[bowler];

        // Update the highest list data
        mostDismissedPlayerCount = Math.max(
          mostDismissedPlayerCount,
          dismissalData.totalDismissal
        );
      }
    }

    // To create an array for storing the data
    const mostDismissedBatsman = [];
    // To find out most dismissal batsman by a bowler
    for (const batsman in dismissedPlayersData) {
      // Get the bowlers list that dismissed particular one batsman
      const bowlersData = dismissedPlayersData[batsman];

      // Iterate through particular bowler
      for (const bowler in bowlersData) {
        // Get the dismissal count
        let dismissalCount = bowlersData[bowler].totalDismissal;

        // To check for the most dismissal count if it is then push the data
        if (mostDismissedPlayerCount === dismissalCount) {
          // push the batsman data
          mostDismissedBatsman.push({
            batsman_name: batsman,
            dismissed_by: bowler,
            dismissal_count: mostDismissedPlayerCount,
          });
        }
      }
    }

    // Write the data in output
    outputStoreFunction(
      mostDismissedBatsman,
      "highestTimesOnePlayerDismissedByAnotherPlayer"
    );
  } else {
    console.log("Deliveries Data is not a valid array format");
  }
}

// Invotke the function
getMostDismissedPlayerByAnother();
