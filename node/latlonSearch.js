/*=====================================================
PART 2
This code takes a JSON File like this:

[
  {
    "Institucion": "Ministerio De Educación",
    "Monto_Total": 800000,
    "Comuna_Institucion": "Antofagasta",
    "lat": 0,
    "lon": 0
  }
]

and searches for the lat and lon based on the Comuna returning this:

[
  {
    "Institucion": "Ministerio De Educación",
    "Monto_Total": 800000,
    "Comuna_Institucion": "Antofagasta",
    "lat": -23.6509279,
    "lon": -70.39750219999999
  }
]
=====================================================*/

// modules
var fs = require('fs');
var NodeGeocoder = require('node-geocoder');
var jsonfile = require('jsonfile');
var RateLimiter = require('limiter').RateLimiter;
const repl = require('repl');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var geocoder = require('geocoder');
//require('longjohn');

var options = {
  provider: 'google',
  apiKey: key_empresasDos
};
var geocoder = NodeGeocoder(options);
// geocoder version
// var apiKey = {key: key_test_one};
var limiter = new RateLimiter(40, 'second'); // Allow 50 requests per second (the Google Maps Geocoding API Usage Limits).

// Load Original JSON
var fullFile = 'data/json/inst_id_1_100000.json';
var partiaFile = 'data/json/tens/latlon/e90001-100000latlon.json';
var itemsProcessed = 0;

// // Create Streams to read and Write
// var writeStream = fs.createWriteStream('data/json/i/i1-10000latlon.json');
// var readStream = fs.createReadStream(partiaFile, {encoding: 'utf8'})
//
// // Search for lat and lon
// var search = es.map(function (data, callback) {
//
//   // limiter.removeTokens(1, function(error, remainingRequests) {
//
//   if(data.lat == ""){
//     //readStream.pause();
//
//     geocoder.geocode({address: data.Comuna_Institucion, country: "Chile"}) // Choose between Comuna_Empresa and Comuna_Institucion
//     .then(function(res) {
//       console.log("Searched for " + res[0].formattedAddress);
//       data.lat = res[0].latitude;
//       data.lon = res[0].longitude;
//       //readStream.resume();
//       callback(null,data);
//
//     })
//     .catch(function(err) {
//       console.log("There was an error with element with id of " + data.id);
//       console.log("Here is the error: " + err);
//       readStream.resume();
//       //readStream.resume();
//       callback(null,data);
//     });
//   }
//   else {
//     console.log(data.id + " Is OK! :)")
//     readStream.resume();
//     //readStream.resume();
//     callback(null,data);
//   }
//
//   // });
// })
//
// // Use pipes to handle large JSON File
// readStream
//   .pipe(JSONStream.parse('*'))
//   .pipe(search)
//   .pipe(JSONStream.stringify())
//   .pipe(writeStream)


// JSON File Manipulation without Stream, just using the memory: In this case all data is stored in one big variable once.
jsonfile.readFile(partiaFile, function(err, obj) {

  if(obj != undefined){

    //// Loop through all the obects in the file ////
    obj.forEach(function(element, index, array){

      // Search for the Lat and Long of Institucion
      limiter.removeTokens(1, function(error, remainingRequests) {

          if(element.lat == 0){

            // With a Promise
            geocoder.geocode({address: element.Comuna_Empresa, country: "Chile"}) // Choose between Comuna_Empresa and Comuna_Institucion
            .then(function(res) {
              console.log("Searched for " + res[0].formattedAddress);
              element.lat = res[0].latitude;
              element.lon = res[0].longitude;
              itemsProcessed++;
              if(itemsProcessed == array.length) {
                saveFile();
              }
            })
            .catch(function(err) {
              console.log("There was an error with element at index = " + index);
              console.log("Here is the error: " + err);
              itemsProcessed++;
              if(itemsProcessed == array.length || err == 'Error: Status is OVER_QUERY_LIMIT. You have exceeded your rate-limit for this API.') {
                saveFile();
              }
            });

            // With a Callback
            // geocoder.geocode({address: element.Comuna_Institucion, country: "Chile"}, function(err, res) {
            //   if(err == null){
            //     console.log("Searched for " + res[0].formattedAddress);
            //     element.lat = res[0].latitude;
            //     element.lon = res[0].longitude;
            //   }
            //   itemsProcessed++;
            //   if(itemsProcessed == 2) {
            //     saveFile();
            //   }
            // });

        }
        else{
          itemsProcessed++;
          if(itemsProcessed == array.length) {
            console.log("Writing new file");
            saveFile();
          }
        }

      });

    });

    // Write the modified obj to the file
    function saveFile(){
      jsonfile.writeFile('data/json/tens/latlon/e90001-100000latlon.json', obj, {spaces: 0}, function(err) { // Change 1 to 0 for non-debug mode
        if (err) {
          console.log("There was an error writing the new file: " + err);
          process.exit();
        }
        else{
          console.log("Writing new file");
          process.exit();
        }
      });

    }

    // Catch if the script is cancel
    process.on('SIGINT', (code) => {
      saveFile();
    });

  }
});
