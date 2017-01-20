/*=====================================================
This code takes a CSV File like this:

Institucion,Monto_Total,Comuna_Institucion,lat,lon
Ministerio De Educación,800000,Antofagasta,0,0

and searches for the lat and lon based on the Comuna returning this:

Institucion,Monto_Total,Comuna_Institucion,lat,lon
Ministerio De Educación,800000,Antofagasta,-30,-70
=====================================================*/

//////////////  Modules //////////////
var NodeGeocoder = require('node-geocoder');
var RateLimiter = require('limiter').RateLimiter;
var transform = require('stream-transform');

//////////////  Geocoder options //////////////
var options = {
  provider: 'google',
  apiKey: APIKEY
};
var geocoder = NodeGeocoder(options);
// Allow 50 requests per second (the Google Maps Geocoding API Usage Limits).
var limiter = new RateLimiter(45, 'second');

////////////// Load Original JSON //////////////
var file = 'data/csv/dummy.csv';
var itemsProcessed = 0;


transform(file, function(data){
  console.log(data);
  //return data.join(',')+'\n';
}, function(err, output){

});



/*
////////////// JSON File Manipulation //////////////
jsonfile.readFile(partiaFile, function(err, obj) {

  //// Loop through all the obects in the file ////
  obj.forEach(function(element, index, array){

    // Search for the Lat and Long of Institucion
    limiter.removeTokens(1, function(error, remainingRequests) {
      //console.log("Amount of items Processed: " + itemsProcessed);


      if(element.lat == 0){
        //console.log(element.Comuna_Institucion +  " " + index);

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
          console.log("Here is the error: " + err)
          itemsProcessed++;
          if(itemsProcessed == array.length) {
            saveFile();
          }
        });

      }

      else{
        itemsProcessed++;
        if(itemsProcessed == array.length) {
          saveFile();
        }
      }

    });

  });

  // Write the modified obj to the file
  function saveFile(){
    jsonfile.writeFile('data/json/03empresa_0-2001_LatLon.json', obj, {spaces: 1}, function(err) { // Change 1 to 0 for non-debug mode
      if (err) {
        console.log("There was an error writing the new file: " + err);
      }
      else{
        console.log("Writing new file");
      }
    });
  }
})
*/
