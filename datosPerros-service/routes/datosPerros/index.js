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

// Obtener detalles de un perro por el nombre
router.get("/detalleperro/:nombre", (req, res) => {
  const perroNombre = req.params.nombre;
  let perroEncontrado = [];

  if (data.perro_nombre.includes(req.params.perro_nombre)) {
    results.push(data);
  }
  if (perroEncontrado) {
    const response = {
      service: "Datos de perros",
      architecture: "microservices",
      data: perroEncontrado,
    };
    return res.send(response);
  } else {
    return res.status(404).send("No se encontró ningún perro con ese nombre.");
  }
});
module.exports = router;
