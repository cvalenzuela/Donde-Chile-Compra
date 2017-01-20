/*

Mapbox handling

*/

// Mapbox Access
mapboxgl.accessToken = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA';

// Mapbox Container
var map = new mapboxgl.Map({
    container: 'map',
    style: './assets/data/style.json',
    zoom: 4.3020109014975665,
    center: [-69.59540019097976,-40.46037483580851],
    bearing: 68.00000000000024,
    interactive: true,
    minZoom: 4.009441099976243,
    maxZoom: 4.009441099976243,
    hash: true,
    dragRotate: false,
    trackResize: false
});

// When the Maps Loads
map.on('load', function() {

  // Create a new Institucion with id = current
  // map.addLayer({
  //   "id": "currentInstitucion",
  //   "type": "circle",
  //   "source": "composite",
  //   "source-layer": "institucioneslatlongeojson",
  //   //"filter": ["==", "id", 0],
  //   "layout": {
  //     "visibility": "visible"
  //    },
  //    "paint": {
  //      "circle-color": "hsl(350, 67%, 58%)",
  //      "circle-radius": 6,
  //      "circle-opacity": 0.9
  //    }
  // });

  // Create a new Empresa with the same id
  // map.addLayer({
  //   "id": "currentEmpresa",
  //   "type": "circle",
  //   "source": "composite",
  //   "source-layer": "empresaslatlongeojson",
  //   //"filter": ["==", "id", 0],
  //   "layout": {
  //     "visibility": "visible"
  //    },
  //    "paint": {
  //      "circle-color": "hsl(102, 39%, 56%)",
  //      "circle-radius": 6,
  //      "circle-opacity": 0.9
  //    }
  //  });

});
