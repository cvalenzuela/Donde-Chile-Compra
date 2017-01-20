/*=====================================================
PART 1
This code can take XLSX, TSV or CSV files like this:

Institucion,Monto_Total,Comuna_Institucion,lat,lon
Ministerio De Educación,800000,Antofagasta,0,0

(For utf8 use CSV exported from Google SpreadSheet)

and creates a JSON File like this:

[
  {
    "Institucion": "Ministerio De Educación",
    "Monto_Total": 800000,
    "Comuna_Institucion": "Antofagasta",
    "lat": 0,
    "lon": 0
  }
]
=====================================================*/

//////////////  Modules //////////////
var jsonfile = require('jsonfile');
var prompt = require('prompt');
var Converter = require("csvtojson").Converter;
var xlsxj = require("xlsx-to-json");
var tsv = require("node-tsv-json");
var converter = new Converter({});


// Star the Prompt to ask user
//prompt.start();

//prompt.get(['input', 'json'], function (err, result) {

///// XLSX INPUT /////
// xlsxj({
//   input: "data/xlsx/dummy.xlsx",
//   output: "data/dummy/dummy_noviembre"
// }, function(err, result) {
//   if(err) {
//     console.error(err);
//   }else {
//     console.log("Done! File Written! :)");
//   }
// });

///// CSV INPUT /////
converter.on("end_parsed", function (jsonArray) {
   jsonfile.writeFile("data/json/tens/e10001-20000.json", jsonArray, {spaces: 1}, function(err) { // Change 1 to 0 for non-debug mode
     if (err) {
       console.log("There was an error writing the new file: " + err);
     }
     else{
       console.log("New JSON File ready! :)");
     }
   });
});

// Read the CSV File and pipe to converter. This supports utf8
require("fs").createReadStream("data/csv/tens/e10001-20000.csv", {encoding: 'utf8'}).pipe(converter);

///// TSV INPUT /////
// tsv({
//   input: "data/tsv/dummy.tsv",
//   output: "data/dummy/dummy_noviembre.json"
//   ,parseRows: true
// }, function(err, result) {
//   if(err) {
//     console.error(err);
//   }else {
//     console.log("New JSON File ready! :)");
//   }
// });

//});
