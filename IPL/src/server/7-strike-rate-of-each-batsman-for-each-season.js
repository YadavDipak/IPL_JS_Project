// Problem 7: Find the strike rate of a batsman for each season

// Import the required modules
const csvToJsonConverter = require("../utils/csvToJson");
const outputStoreFunction = require("../utils/dataToFileFunction");

// Create a function to get strike rate of players for each season
function getStrikeRateOfEachPlayers() {
  // To get the matches data in object form using converter
  const matchesData = csvToJsonConverter("matches");

  if (Array.isArray(matchesData)) {
    // Initialize the match ids to get all the match ids for one particular year
    let matchIdsMapOneYear = {};

    // To find all the match ids of particular year
    for (let index = 0; index < matchesData.length; index++) {
      // To get the match ids
      const matchId = matchesData[index].id;
      // To get the match season
      const matchYear = matchesData[index].season;

      // Map match id with year
      matchIdsMapOneYear[matchId] = matchYear;
    }

    // To get the deliveries data in a object form using converter
    const deliveriesData = csvToJsonConverter("deliveries");

    if (Array.isArray(deliveriesData)) {
      // Initialize an object to store the bowlers data
      let playersStrikeRateData = {};

      // Iterating on deliveries data to get the extra runs
      for (let index = 0; index < deliveriesData.length; index++) {
        // To Fetch all the delivery data one by one
        const delivery = deliveriesData[index];

        // To get the match ids of the delivery
        const matchId = delivery.match_id;
        // To get the match year of the delivery
        const matchYear = matchIdsMapOneYear[matchId];
        // To get the batsman Name of the delivery
        const batsManName = delivery.batsman;

        // Check for new player

        if (!playersStrikeRateData[batsManName]) {
          // Initialize an object for new season
          playersStrikeRateData[batsManName] = {};
          // Initialize batsman data for the season
          playersStrikeRateData[batsManName][matchYear] = {
            totalRuns: 0,
            totalBalls: 0,
          };
        } else if (!playersStrikeRateData[batsManName][matchYear]) {
          // To initialize the batsman with data for the season with totalRuns and totalBalls
          playersStrikeRateData[batsManName][matchYear] = {
            totalRuns: 0,
            totalBalls: 0,
          };
        }

        // Add the current delivery in batsman's totalBalls if ball is not wide
        if (!delivery.wide_runs) {
          playersStrikeRateData[batsManName][matchYear].totalBalls++;
        }

        // Similarly Add the batsman'runs for each delivery into batsman's total runs
        playersStrikeRateData[batsManName][matchYear].totalRuns +=
          delivery.batsman_runs;
      }

      // To calculate the strike rate of every player of every season
      for (const player in playersStrikeRateData) {
        // To get all the players list in each  season to find out strike rates
        const yearWiseData = playersStrikeRateData[player];

        // Iterate the data to calculate strike rate of every player
        for (const year in yearWiseData) {
          // To get total runs and total balls to calculate strike rate
          const totalRuns = yearWiseData[year].totalRuns;
          const totalBalls = yearWiseData[year].totalBalls;

          // To calculate strike rate of every batsman by, dividing total runs by total balls and multiplying by 100 and rounding up
          const strikeRate = Math.round((totalRuns / totalBalls) * 100);

          // Add the strike rate into data
          yearWiseData[year]["strikeRate"] = strikeRate;
          // Delete the unnecessary data
          delete yearWiseData[year].totalRuns;
          delete yearWiseData[year].totalBalls;
        }
      }

      // Print the text in output file
      outputStoreFunction(
        playersStrikeRateData,
        "strikeRateOfEachBatsmanForEachSeason"
      );
    } else {
      console.log("Deliveries Data is not a valid array format");
    }
  } else {
    console.log("Matches Data is not a valid array format");
  }
}

// Invoke the function
getStrikeRateOfEachPlayers();
