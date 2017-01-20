/*
Load the data in the dropdows menus
*/

var convenios = document.getElementById("convenios");
var regiones = document.getElementById("regiones");

var conveniosMarco = [
  "Suministro combustibles",
  "Hotelería, arriendo de salones y servicios gastronómicos",
  "Artículos de ferretería, materiales para la construcción y electrodomésticos",
  "Arriendo de Vehículos",
  "Libros, música, películas, revistas, diarios y Mat Didáctico",
  "Avisaje en medios",
  "Seguro obligatorio de accidentes personales (Soap)",
  "Servicio de búsqueda y evaluación",
  "Seguro vida con adicional salud",
  "Transporte aéreo de pasajeros",
  "Servicios courier, operador logistico y servicios de mudanza",
  "Construcción salas cuna y jardines infantiles",
  "Ortesis, prótesis y endoprótesis",
  "Datacenter y servicios asociados",
  "Lentes, Audífonos e Implantes Auditivos",
  "Material didáctico, instrumentos y deporte",
  "Servicios de impresión y fotocopiado",
  "Vehículos",
  "Neumáticos, accesorios para vehículos y servicios asociados",
  "Alimentos perecibles y no perecibles",
  "Desarrollo y mantención de software",
  "Hemodiálisis",
  "Artículos de Escritorio y Papelería",
  "Reclutamiento, selección y consultorias en RRHH",
  "Suministros de impresora + impresoras y arriendo de impresoras",
  "Producción de eventos",
  "Campañas Comunicacionales",
  "Menaje, Aseo y cuidado personal",
  "Hardware y Licencia de Software",
  "Gas licuado de petróleo",
  "Administración de beneficios de alimentación, uniformes, vestuario institucional y ropa corporativa",
  "Mobiliario",
  "Productos y servicios para emergencias",
  "Servicios de Capacitación y Formación"
]

var regionesChile = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana",
  "Lib. Gral. Bdo. O'Higgins",
  "Maule",
  "Bío-Bío",
  "Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén",
  "Magallanes y Antártica"
]

// Add all Convenios Marco to the dropdown
for (var i = 0; i < conveniosMarco.length; i++){
    var convenio = document.createElement("option");
    convenio.value = conveniosMarco[i];
    convenio.innerHTML = conveniosMarco[i];
    convenios.appendChild(convenio);
}

// Add all Regiones to the dropdows
for(var i = 0; i < regionesChile.length; i++){
  var region = document.createElement("option");
  region.value = regionesChile[i];
  region.innerHTML = regionesChile[i];
  regiones.appendChild(region);
}
