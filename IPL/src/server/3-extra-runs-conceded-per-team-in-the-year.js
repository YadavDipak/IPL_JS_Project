// Problem3: Extra runs conceded per team in the year 2016

// import the required modules
const csvToJsonConverter = require("../utils/csvToJson");
const outputStoreFunction = require("../utils/dataToFileFunction");

// function to get all extra run per team in a year

function getExtraRunsConcededByTeamInYear(year) {
  // To get the matches object using csvToJsonConverter
  const matchesData = csvToJsonConverter("matches");

  if (Array.isArray(matchesData)) {
    // Initialize the match id
    let matchId = [];

    // To find all the match id of particular year

    for (let index = 0; index < matchesData.length; index++) {
      const match = matchesData[index];
      if (match.season === year) {
        matchId.push(match.id);
      }
    }

    // To get the delivery object using csvToJsonConverter

    const deliveriesData = csvToJsonConverter("deliveries");

    if (Array.isArray(deliveriesData)) {
      // Initialize the object to get the data
      let teamsExtraRunsData = {};

      // Iterating on deliveries to get the extra runs

      for (let index = 0; index < deliveriesData.length; index++) {
        const delivery = deliveriesData[index];

        // To check the correct match id

        if (matchId.includes(delivery.match_id)) {
          // If data has not included in an object form then create it
          if (!teamsExtraRunsData[delivery.bowling_team]) {
            teamsExtraRunsData[delivery.bowling_team] = { extraRuns: 0 };
          }
          teamsExtraRunsData[delivery.bowling_team].extraRuns += Number(
            delivery.extra_runs
          );
        }
      }

      // Write the data into output file
      outputStoreFunction(
        teamsExtraRunsData,
        "extraRunsConcededPerTeamInTheYear2016"
      );
    } else {
      console.log("Deliveries Data is not a Valid array");
    }
  } else {
    console.log("Matches Data is not a Valid array");
  }
}

// Call the function to executed
getExtraRunsConcededByTeamInYear(2016);
