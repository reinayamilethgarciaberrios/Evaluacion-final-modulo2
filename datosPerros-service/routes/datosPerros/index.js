// Importamos el paquete express
const express = require("express");

// Creamos un objeto Router
const router = express.Router();

// Importamos el módulo data-Library que contiene los datos de los perros
const data = require("../../data/datos_perro");

// Creamos una función logger que muestra un mensaje en consola
const logger = (message) => console.log(`Perros Service: ${message}`);


router.get("/", (req, res) => {
  
  const response = {
    service: "Datos de perros",
    architecture: "microservices",
    data: data.dataPerros.perros,
  };

  // Enviamos la respuesta
  return res.send(response);
});


// este es del item 3
router.get("/nombre/:nombre", async(req, res) => {
  const nombre = req.params.nombre.split(",");
  let perrosFiltrados = data.dataPerros.perros;
  if (nombre) {
    perrosFiltrados = perrosFiltrados.filter(
      (perro) => perro.nombre_perro = nombre
    );
  }
  const idCampeon = perrosFiltrados.map(p => p.Id);
  const url = "http://premios:4000/api/v2/premios/idCampeon/"
  perrosFiltrados = await fetch(url+idCampeon).then(response => response.json());
  const response = {
    service: "Perros por nombre",
    architecture: "microservices",
    data: perrosFiltrados,
  };
  return res.send(response);
});

// filtro perros por raza
router.get("/raza/:raza", (req, res) => {
  const raza = req.params.raza.split(",");
  let perrosFiltrados = data.dataPerros.perros;
  if (raza) {
    perrosFiltrados = perrosFiltrados.filter(
      (perro) => raza.some(p => perro.raza.includes(p)) 
    );
  }
  const response = {
    service: "Perros por raza",
    architecture: "microservices",
    data: perrosFiltrados,
  };
  return res.send(response);
});

// ejercicio 2
router.get("/promedio/:raza", async(req, res) => {
  const perros = data.dataPerros.perros;
  // const datosPerros = perros.perros.filter(perro => perro.raza === req.params.raza);
  // const sumaPeso = datosPerros.reduce((acc, perro) => acc + perro.peso, 0);
  // const totalPerros = datosPerros.length;

  const response = {
    "Promedio total del peso de perros": sumaPeso/totalPerros,
    //datosPerros
    perros

  };
  return res.send(response);
});

module.exports = router;
