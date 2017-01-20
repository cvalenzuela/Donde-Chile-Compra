/*=====================================================
PART 1.2
This will replace all ";" with ","
=====================================================*/

var replace = require('replace');

var fileToReplace = 'data/json/tens/e1-10000.json';

replace({
  regex: ";",
  replacement: ",",
  paths: [fileToReplace],
  recursive: true,
  silent: true,
});

console.log("Replaced all ';' with ',' in file: " +  fileToReplace);
