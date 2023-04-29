// Importamos la biblioteca Express
const express = require("express");
const csv = require('csv-parser');
const fs = require('fs'); 

// Creamos un router de Express
const router = express.Router();
router.use(express.json()); 
// Creamos una función de registro que imprime mensajes de registro en la consola
const logger = (message) => console.log(`raza Service: ${message}`);

router.get("/", (req, res) => {
  const results = [];
  const data = "./data/raza_info.csv"
  
  fs.createReadStream(data)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      
      const response = {
        service: "raza",
        architecture: "microservices",
        raza: results
      };
      logger("Get raza data");
      return res.send(response);
    });
});


// Exportamos el router
module.exports = router;
