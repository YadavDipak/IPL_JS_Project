// Problem4: Top 10 economical bowlers in the year 2015

// import the required modules
const csvToJsonConverter = require("../utils/csvToJson");
const outputStoreFunction = require("../utils/dataToFileFunction");

// Function to get top 10 economical bowlers per year
function getTop10EconomicBowlersInaYear(year) {
  // To get the matches object using csvToJsonConverter
  const matchesData = csvToJsonConverter("matches");

  // To check the given data is an array
  if (Array.isArray(matchesData)) {
    // Initialize the match ids to get all match ids for a particular year
    let matchIds = [];

    // To find all the match ids using iteration
    for (let index = 0; index < matchesData.length; index++) {
      const match = matchesData[index];
      if (match.season === year) {
        matchIds.push(match.id);
      }
    }
    // To get the deliveries object using csvToJsonConverter
    const deliveriesData = csvToJsonConverter("deliveries");

    if (Array.isArray(deliveriesData)) {
      // Initialize the object to get the the bowlers data in object form
      let bowlersData = {};

      // Iterating on deliveries to get the extra runs
      for (let index = 0; index < deliveriesData.length; index++) {
        const delivery = deliveriesData[index];

        // To check for correct match id and not a super over
        if (!delivery.is_super_over && matchIds.includes(delivery.match_id)) {
          // If data has not included then apply condition
          if (!bowlersData[delivery.bowler]) {
            bowlersData[delivery.bowler] = {
              totalRuns: 0,
              totalBowls: 0,
            };
          }

          if (!delivery.wide_runs && !delivery.noball_runs) {
            bowlersData[delivery.bowler].totalBowls++;
          }

          const totalRunsConceded =
            delivery.wide_runs + delivery.noball_runs + delivery.batsman_runs;

          bowlersData[delivery.bowler].totalRuns += totalRunsConceded;
        }
      }

      for (const bowler in bowlersData) {
        // fetching the bowlers data
        let { totalRuns, totalBowls } = bowlersData[bowler];

        let overs = totalBowls / 6;

        bowlersData[bowler]["economy"] = totalRuns / overs;
        delete bowlersData[bowler].totalRuns;
        delete bowlersData[bowler].totalBowls;
      }

      // Sort the bowlers data based on economy
      const sortedBowlersData = [...Object.entries(bowlersData)].sort(
        (bowler1, bowler2) => bowler1[1].economy - bowler2[1].economy
      );
      const top10MostEconomicBowlers = Object.fromEntries(
        sortedBowlersData.slice(0, 10)
      );

      // Output the text in output file

      outputStoreFunction(
        top10MostEconomicBowlers,
        "top10EconomicalBowlersInAYear"
      );
    } else {
      console.log("Deliveries data is not an valid array.");
    }
  } else {
    console.log("Matches data is not an valid array.");
  }
}

// Call the function and execute
getTop10EconomicBowlersInaYear(2015);
