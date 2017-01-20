/*
Concat all JSON Files
*/
var jsonfile = require('jsonfile');
var fs = require('fs');

// jsonArray1 = jsonArray1.concat(jsonArray2);

var fileOne = 'data/json/tens/latlon/empresaslatlon.json';
var fileTwo = 'data/json/tens/latlon/e90001-100000latlon.json';
var final;

jsonfile.readFile(fileOne, function(err1, obj1) {
  jsonfile.readFile(fileTwo, function(err2, obj2) {
    final = obj1.concat(obj2);
    console.log('Concat ' + fileOne + ' + ' + fileTwo);
    saveFile()
  });

  // Write the modified obj to the file
  function saveFile(){
    jsonfile.writeFile('data/json/tens/latlon/empresaslatlon.json', final, {spaces: 0}, function(err) { // Change 1 to 0 for non-debug mode
      if (err) {
        console.log("There was an error writing the new file: " + err);
      }
      else{
        console.log("Writing new file");
      }
    });
  }

});
