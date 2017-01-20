/*=====================================================
PART 3
This code takes a JSON File like this:

[
  {
    "Institucion": "Ministerio De Educación",
    "Monto_Total": 800000,
    "Comuna_Institucion": "Antofagasta",
    "lat": -23.6509279,
    "lon": -70.39750219999999
  }
]

and searches replaces is with GEOJSON like this:

{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "geometry": {
    "type": "Point",
    "coordinates": [
      -70.39750219999999,
      -23.6509279
    ]
    },
    "properties": {
      "Institucion": "Ministerio De Educación",
      "Monto_Total": 800000,
      "Comuna_Institucion": "Antofagasta"
    }
  }]
}

To Transform to MBTILES:
tippecanoe -o data/mbtiles/institucioneslatlon.mbtiles data/geojson/institucioneslatlon.geojson
tippecanoe -o data/mbtiles/empresaslatlon.mbtiles -Z 1 -z 12 data/geojson/empresaslatlon.geojson -B 4 -m 4 -d 4
tippecanoe -o data/mbtiles/empresaslatlon.mbtiles data/geojson/empresaslatlon.geojson -Z 3 -z 4 -ps -pk -pp -pc -B 4 -d 4 -D 4 -m 4
tippecanoe -o data/mbtiles/empresaslatlon.mbtiles data/geojson/empresaslatlon.geojson -Z 5 -z 8
tippecanoe -o data/mbtiles/empresaslatlon.mbtiles data/geojson/empresaslatlon.geojson -Z 1 -z 12 -B 3 -pf -pc

tippecanoe -o data/mbtiles/institucioneslatlon.mbtiles data/geojson/institucioneslatlon.geojson -Z 4
tippecanoe -o data/mbtiles/empresaslatlon.mbtiles data/geojson/empresaslatlon.geojson -Z 3 -z 5

=====================================================*/

//////////////  Modules //////////////
var GeoJSON = require('geojson');
var jsonfile = require('jsonfile');

////////////// Load JSON //////////////
var file = 'data/json/tens/latlon/empresaslatlon.json';

////////////// JSON File Manipulation //////////////
jsonfile.readFile(file, function(err, obj) {
  var geoJSONFile = GeoJSON.parse(obj, {Point: ['lat', 'lon']});

  //// Save the New GeoJSON File ////
  jsonfile.writeFile('data/geojson/empresaslatlon.geojson', geoJSONFile, {spaces: 0}, function(err) { // Change 1 to 0 for non-debug mode
    if (err) {
      console.log("There was an error writing the new file: " + err);
    }
    else{
      console.log("Writing new file: " + file);
    }
  });

})
