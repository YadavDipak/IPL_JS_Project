// problem 9: Find the bowler with the best economy in super overs

// Import the required modules
const csvToJsonConverter = require("../utils/csvToJson");
const outputStoreFunction = require("../utils/dataToFileFunction");

// Function to find out most economical bowler in super over
function getBowlerWithMostEconomicalInSuperOver() {
  // To get the deliveries data using converter
  const deliveriesData = csvToJsonConverter("deliveries");

  // Validate on deliveries data that is array form or not
  if (Array.isArray(deliveriesData)) {
    // Initialize an object to get all bowlers economy in super over
    const bowlersEconomyData = {};

    // Iterate the data to get the bowlers name
    for (const delivery of deliveriesData) {
      // To check it is super over or not
      const isSuperOver = delivery.is_super_over;
      if (isSuperOver) {
        // Get the bowler name for economy in super over
        const bowlerName = delivery.bowler;
        if (!bowlersEconomyData[bowlerName]) {
          bowlersEconomyData[bowlerName] = {
            totalRuns: 0,
            totalBalls: 0,
          };
        }
        // If bowler bowls a valid bowl ball then
        if (!delivery.wide_runs && !delivery.noball_runs) {
          bowlersEconomyData[bowlerName].totalBalls++;
        }

        // Total runs conceded on that particular balls
        const totalRunsConceded =
          delivery.wide_runs + delivery.noball_runs + delivery.batsman_runs;

        // Add total runs conceded on that balls by bowler an update it
        bowlersEconomyData[bowlerName].totalRuns += totalRunsConceded;
      }
    }

    // Initialize an object for most economical
    let bestEconomy = Number.MAX_VALUE;
    let mostEconomicBowler = {};

    // To iterates on bowlersEconomyData
    for (const bowler in bowlersEconomyData) {
      // To get the bowlers data
      const totalRuns = bowlersEconomyData[bowler].totalRuns;
      const totalBalls = bowlersEconomyData[bowler].totalBalls;

      // Current economy
      let currEconomy = parseInt((totalRuns / (totalBalls / 6)).toFixed(3));

      // Update the bestEconomy and find out best economical bowler
      if (bestEconomy > currEconomy) {
        bestEconomy = currEconomy;
        mostEconomicBowler = {
          bowlerName: bowler,
          economy: bestEconomy,
        };
      }
    }

    // Write the result in output folder
    outputStoreFunction(mostEconomicBowler, "mostEconomicalBowlerInSuperOver");
  } else {
    console.log("Deliveries Data is not an valid Array format");
  }
}

// Call the function
getBowlerWithMostEconomicalInSuperOver();
