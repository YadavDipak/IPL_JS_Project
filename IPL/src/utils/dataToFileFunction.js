// import the required modules
const fs = require("fs");
const path = require("path");

// function to output the data in a file
function outputDataInFile(data, fileName) {
  // handling error in try and catch block
  try {
    fs.writeFileSync(
      path.resolve(__dirname, `../public/output/${fileName}.json`),
      JSON.stringify(data)
    );
    console.log(`Successfully written the data in ${fileName}.json.`);
  } catch (error) {
    console.log("Error while writing the data in file.", error);
  }
}

// exports the function
module.exports = outputDataInFile;
