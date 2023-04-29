// Importa el framework Express
const express = require("express");

// Importa el archivo que contiene las rutas para la gestión de las ubicaciones
const raza = require("../routes/raza");

// Crea una instancia de la aplicación Express
const app = express();

app.use("/api/v2/raza", raza);

// Exporta la aplicación para ser utilizada en otros módulos
module.exports = app;


