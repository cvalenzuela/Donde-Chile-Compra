/*******

Main File
cvalenzuela@nyu.edu

*******/

///////////////////////////
//////// Variables ////////
///////////////////////////

var institucion = document.getElementById('institucion');
var comunaInstitucion = document.getElementById('comuna_institucion');
var empresa = document.getElementById('empresa');
var comunaEmpresa = document.getElementById('comuna_empresa');
var producto = document.getElementById('producto');
var montoTotal = document.getElementById('monto_total');
var startStop = document.getElementById('start_stop');
var speed = document.getElementById("speed");
var convenios = document.getElementById("convenios");
var regiones = document.getElementById("regiones");
var description = document.getElementById("description");
var nothing = document.getElementById("nothing");
var amountCompras = document.getElementById("amount");
var compras = document.getElementById("compras");
var conveniosDeChile = document.getElementById("convenios_de_chile");
var empresasDeChile = document.getElementById("empresas_de_chile");

var convenio = "todos";
var region = "todas";

// Id of tiles database from Mapbox style.json
var datosInstitucion = "instituciones";
var datosEmpresa = "empresaslatlongeojson";
var regionesDeChile = "cl-regiones-geo-1m0709"

var datosInstitucionAnimacion = 'inst-1-2000latlon';
var datosEmpresaAnimacion = 'empresa-1-2000latlon';

var x_institucion,
  y_institucion,
  y_comunaInstitucion,
  x_empresa,
  y_empresa,
  y_comunaEmpresa;

// Animate Variables
var pause = false;
var fps = 1;
var current = 1;
var lengthOfItems = 2;
var currentId,
    currentInstitucion,
    currentEmpresa,
    amount,
    getAnimation,
    getItem,
    getFilter,
    getDescriptions;

var sendNext = false;

///////////////////////////
//////// Animation ////////
///////////////////////////

function animate() {

  getAnimation = setTimeout(function() {

    // Change the current item to show.
    if(current > lengthOfItems){
      current = 1;
    }
    else{
      current++;
    }

    // Get the first item in the current selection
    if(map.queryRenderedFeatures({ layers: [datosInstitucionAnimacion] })[current-1] != undefined){
      getItem = setTimeout(function(){currentId = map.queryRenderedFeatures({ layers: [datosInstitucionAnimacion] })[current-1].properties.id;},300);
    }

    getFilter = setTimeout(function(){
    // Set the filter for the new item
    map.setFilter('currentInstitucion', ['==', 'id', currentId]);
    map.setFilter('currentEmpresa', ['==', 'id', currentId]);

    // Show
    producto.style.display = "inline-block";
    montoTotal.style.display = "inline-block";
    institucion.style.display = "inline-block";
    comunaInstitucion.style.display = "inline-block";
    empresa.style.display = "inline-block";
    comunaEmpresa.style.display = "inline-block";

    // Reset Classes in order to give animation
    institucion.className = "institucion moveableText flipOutX";
    comunaInstitucion.className = "institucion moveableText comuna flipOutX";
    empresa.className = "empresa moveableText flipOutX";
    comunaEmpresa.className = "empresa moveableText comuna flipOutX";
    producto.className = "col-xs-4 col-xs-offset-4 text-center animated";
    montoTotal.className = "col-xs-2 col-xs-offset-5 text-center animated";
  },500);

    // Change the content of the descriptions, wait 300ms for the data of the new layer to be loaded
    getDescriptions = setTimeout(function(){

      // Style the background of producto and montoTotal. This could be based on the value of the Monto_Total
      producto.style.backgroundColor = "#f3f1f0";
      montoTotal.style.backgroundColor = "#f3f1f0";

      // New Institucion descriptions position (x,y)
      if(map.queryRenderedFeatures({ layers: ["currentInstitucion"] })[0] != undefined){
        x_institucion = map.project(map.queryRenderedFeatures({ layers: ["currentInstitucion"] })[0].geometry.coordinates).x + 5; // X value Name of Institucion
        y_institucion = map.project(map.queryRenderedFeatures({ layers: ["currentInstitucion"] })[0].geometry.coordinates).y + 5; // Y value Name of Institucion
        y_comunaInstitucion = y_institucion + 20; // Y value of Comuna Institucion

        // New Empresa descriptions position (x,y)
        x_empresa = map.project(map.queryRenderedFeatures({ layers: ["currentEmpresa"] })[0].geometry.coordinates).x + 8; // X value Name Empresa
        y_empresa = map.project(map.queryRenderedFeatures({ layers: ["currentEmpresa"] })[0].geometry.coordinates).y - 35; // Y value Name Empresa
        y_comunaEmpresa = y_empresa + 20; // Y value of Comuna Empresa

        // Change to string all number values
        x_institucion.toString();
        y_institucion.toString();
        y_comunaInstitucion.toString();
        x_empresa.toString();
        y_empresa.toString();
        y_comunaEmpresa.toString();

        // Set the position of the descriptions for Institucion
        institucion.style.left = x_institucion+"px";
        institucion.style.top = y_institucion+"px";
        comunaInstitucion.style.left = x_institucion+"px";
        comunaInstitucion.style.top = y_comunaInstitucion+"px";
        institucion.className = "institucion moveableText animated flipInX";
        comunaInstitucion.className = "institucion moveableText comuna animated flipInX";

        // Set the position of the descriptions for Empresa
        empresa.style.left = x_empresa+"px";
        empresa.style.top = y_empresa+"px";
        comunaEmpresa.style.left = x_empresa+"px";
        comunaEmpresa.style.top = y_comunaEmpresa+"px";
        empresa.className = "empresa moveableText animated flipInX";
        comunaEmpresa.className = "empresa moveableText comuna animated flipInX";

        // Set the position of the descriptions for Producto y Monto_Total
        producto.className = "col-xs-4 col-xs-offset-4 text-center animated flipInX";
        montoTotal.className = "col-xs-2 col-xs-offset-5 text-center animated flipInX";

        // Set the content of the descriptions for the new layer
        institucion.innerHTML = map.queryRenderedFeatures({ layers: ["currentInstitucion"] })[0].properties.Institucion;
        comunaInstitucion.innerHTML = map.queryRenderedFeatures({ layers: ["currentInstitucion"] })[0].properties.Comuna_Institucion;
        empresa.innerHTML = map.queryRenderedFeatures({ layers: ["currentEmpresa"] })[0].properties.Nombre_Empresa;
        comunaEmpresa.innerHTML = map.queryRenderedFeatures({ layers: ["currentEmpresa"] })[0].properties.Comuna_Empresa;
        producto.innerHTML = map.queryRenderedFeatures({ layers: ["currentEmpresa"] })[0].properties.Producto;
        montoTotal.innerHTML = "$ " + numberWithPoints(map.queryRenderedFeatures({ layers: ["currentInstitucion"] })[0].properties.Monto_Total);
      }

    },700);

    // Loop though infinite random
    // Loop though infinite random
    if(pause) return;
    window.requestAnimationFrame(animate);
    fps = parseInt(speed.value)*1000;
    // fps = 10000;
  }, fps);
}


///////////////////////////////////////////
///////////// Show All ///////////////////
//////////////////////////////////////////

function showAll(){

  // Stop Animation
  clearTimeout(getAnimation);
  clearTimeout(getItem);
  clearTimeout(getFilter);
  clearTimeout(getDescriptions);
  startStop.value = "Animar";
  pause = true;

  // Clean all filters
  map.setFilter(datosInstitucion);
  map.setFilter(datosEmpresa);
  map.setFilter(datosInstitucionAnimacion, ['<', 'id', 0]);
  map.setFilter(datosEmpresaAnimacion, ['<', 'id', 0]);
  map.setFilter('currentInstitucion', ['==', 'id', 0]);
  map.setFilter('currentEmpresa', ['==', 'id', 0]);
  map.setFilter(regionesDeChile, ['==', 'NOMBRE', 0]);

  // Clear the Institucion, Empresa, Producto y Monto_Total from the animation sequence
  producto.style.display = "none";
  montoTotal.style.display = "none";
  institucion.style.display = "none";
  comunaInstitucion.style.display = "none";
  empresa.style.display = "none";
  comunaEmpresa.style.display = "none";
  nothing.style.display = "none";

  // Get the Filter according to the selection
  convenio = convenios.options[convenios.selectedIndex].value;
  region = regiones.options[regiones.selectedIndex].value;

  map.setLayoutProperty(datosInstitucion, "visibility", "visible");
  map.setLayoutProperty(datosEmpresa, "visibility", "visible");

  // Set the new filters
  if(convenio == "todos" && region == "todas"){
    map.setFilter(datosInstitucion);
    map.setFilter(datosEmpresa);
    setTimeout(function(){amount = map.queryRenderedFeatures({ layers: [datosEmpresa] }).length;},700);
    setTimeout(function(){
      amountCompras.innerHTML = amount*4.5;
      compras.innerHTML = " compras a ";
      conveniosDeChile.innerHTML = "";
      empresasDeChile.innerHTML = "proveedores en todas las regiones de Chile.";
    },900);
  }
  else if(convenio != "todos" && region == "todas"){
    map.setFilter(datosInstitucion, ['==', 'Convenio', convenio]);
    map.setFilter(datosEmpresa, ['==', 'Convenio', convenio]);
    setTimeout(function(){amount = map.queryRenderedFeatures({ layers: [datosEmpresa] }).length;},700);
    setTimeout(function(){
      amountCompras.innerHTML = amount*4.5;
      compras.innerHTML = " compras de ";
      conveniosDeChile.innerHTML = convenio;
      empresasDeChile.innerHTML = " a proveedores en todas las regiones de Chile."
    },900);
  }
  else if(convenio == "todos" && region != "todas"){
    map.setFilter(datosInstitucion, ['==', 'Region_Empresa', region]);
    map.setFilter(datosEmpresa, ['==', 'Region_Empresa', region]);
    map.setFilter(regionesDeChile, ['==', 'NOMBRE', region]);
    setTimeout(function(){amount = map.queryRenderedFeatures({ layers: [datosEmpresa] }).length;},700);
    setTimeout(function(){
      amountCompras.innerHTML = amount*4.5;
      compras.innerHTML = " compras a ";
      conveniosDeChile.innerHTML = "";
      empresasDeChile.innerHTML = "proveedores en la región de " + region
    },900);

  }
  else if(convenio != "todos" && region != "todas"){
    map.setFilter(datosInstitucion, ["all",['==', 'Convenio', convenio],['==', 'Region_Empresa', region]]);
    map.setFilter(datosEmpresa, ["all",['==', 'Convenio', convenio],['==', 'Region_Empresa', region]]);
    map.setFilter(regionesDeChile, ['==', 'NOMBRE', region]);
    setTimeout(function(){amount = map.queryRenderedFeatures({ layers: [datosEmpresa] }).length;},700);
    setTimeout(function(){
      amountCompras.innerHTML = amount*4.5;
      compras.innerHTML = " compras de ";
      conveniosDeChile.innerHTML = convenio;
      empresasDeChile.innerHTML = " a proveedores en la región de " + region
    },900);
  }

  // Show the description
  description.style.display = "inline-block";
}

///////////////////////////////////////////
/////////////// Animation ////////////////
//////////////////////////////////////////

function start(){

  // Get the type of convenio and region from the selects
  convenio = convenios.options[convenios.selectedIndex].value;
  region = regiones.options[regiones.selectedIndex].value;

  // Clear all previous Animations
  clearTimeout(getAnimation);
  clearTimeout(getItem);
  clearTimeout(getFilter);
  clearTimeout(getDescriptions);

  // Hide the description fromt the Total sequence
  description.style.display = "none";
  nothing.style.display = "none";

  // Set filters to display nothing
  map.setFilter(regionesDeChile, ['==', 'NOMBRE', 0]);

  // Start/Stop Animation
  if (startStop.value == "Animar"){

    startStop.value = "Detener";

    // Set the filters for the animation
    if(convenio == "todos" && region == "todas"){
      (function(){
        map.setFilter(datosInstitucion);
        map.setFilter(datosEmpresa);
        map.setFilter(datosInstitucionAnimacion);
        map.setFilter(datosEmpresaAnimacion);
        getLength();
      })();
    }
    else if(convenio != "todos" && region == "todas"){
      (function(){
        map.setFilter(datosInstitucion, ['==', 'Convenio', convenio]);
        map.setFilter(datosEmpresa,  ['==', 'Convenio', convenio]);
        map.setFilter(datosInstitucionAnimacion, ['==', 'Convenio', convenio]);
        map.setFilter(datosEmpresaAnimacion,  ['==', 'Convenio', convenio]);
        getLength();
      })();
    }
    else if(convenio == "todos" && region != "todas"){
      (function(){
        map.setFilter(datosInstitucion, ['==', 'Region_Empresa', region]);
        map.setFilter(datosEmpresa,  ['==', 'Region_Empresa', region]);
        map.setFilter(datosInstitucionAnimacion, ['==', 'Region_Empresa', region]);
        map.setFilter(datosEmpresaAnimacion,  ['==', 'Region_Empresa', region]);
        getLength();
      })();
    }
    else if(convenio != "todos" && region != "todas"){
      (function(){
        map.setFilter(datosInstitucion, ["all",['==', 'Convenio', convenio], ['==', 'Region_Empresa', region]]);
        map.setFilter(datosEmpresa, ["all",['==', 'Convenio', convenio], ['==', 'Region_Empresa', region]]);
        map.setFilter(datosInstitucionAnimacion, ["all",['==', 'Convenio', convenio], ['==', 'Region_Empresa', region]]);
        map.setFilter(datosEmpresaAnimacion, ["all",['==', 'Convenio', convenio], ['==', 'Region_Empresa', region]]);
        getLength();
      })();
    }

    // Get the length of those filters
    function getLength(){
      setTimeout(function(){lengthOfItems = map.queryRenderedFeatures({ layers: [datosInstitucionAnimacion] }).length;},400);
    }

    // Start the animation once everything is configured
    setTimeout(function(){
      if(lengthOfItems > 0){
        fps = 1;
        animate();
      }
      else{
        nothing.style.display = "inline-block";
        clearTimeout(getAnimation);
        clearTimeout(getItem);
        clearTimeout(getFilter);
        clearTimeout(getDescriptions);
        startStop.value = "Animar";
        pause = true;
      }
    },900);

    pause = false;
  }
  else if (startStop.value == "Detener"){
    clearTimeout(getAnimation);
    clearTimeout(getItem);
    clearTimeout(getFilter);
    clearTimeout(getDescriptions);
    startStop.value = "Animar";
    pause = true;
  }
}

///////////////////////////////////////////
///////////// Clean All ///////////////////
//////////////////////////////////////////

function cleanAll(){

  // Set filters to display nothing
  map.setFilter(datosInstitucion, ['<', 'id', 0]);
  map.setFilter(datosEmpresa, ['<', 'id', 0]);
  map.setFilter(datosInstitucionAnimacion, ['<', 'id', 0]);
  map.setFilter(datosEmpresaAnimacion, ['<', 'id', 0]);
  map.setFilter('currentInstitucion', ['==', 'id', 0]);
  map.setFilter('currentEmpresa', ['==', 'id', 0]);
  map.setFilter(regionesDeChile, ['==', 'NOMBRE', 0]);

  // Clear the Institucion, Empresa, Producto y Monto_Total from the animation sequence
  producto.style.display = "none";
  montoTotal.style.display = "none";
  institucion.style.display = "none";
  comunaInstitucion.style.display = "none";
  empresa.style.display = "none";
  comunaEmpresa.style.display = "none";
  description.style.display = "none";
  nothing.style.display = "none";

  // Set the content of the descriptions for the new layer
  institucion.innerHTML = "";
  comunaInstitucion.innerHTML = "";
  empresa.innerHTML = "";
  comunaEmpresa.innerHTML = "";
  producto.innerHTML = "";
  montoTotal.innerHTML = "";

  // Pause the animation
  clearTimeout(getAnimation);
  clearTimeout(getItem);
  clearTimeout(getFilter);
  clearTimeout(getDescriptions);
  startStop.value = "Animar";
  pause = true;
}

///////////////////////////
///// Other Functions /////
///////////////////////////

// Add points to the decimal numbers
function numberWithPoints(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Get a Random Int
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
