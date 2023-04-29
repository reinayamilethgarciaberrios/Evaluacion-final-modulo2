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
//ejercicio 1
router.get("/color/:colorYtamano", (req, res) => {
  const [color, tamano] = req.params.colorYtamano.split(",");
  const results = [];
  const data = "./data/raza_info.csv"

  fs.createReadStream(data)
    .pipe(csv())
    .on('data', (data) => {
      if(data.color_de_pelo.includes(color) && data.tamanio_de_pelo.includes(tamano)){
        results.push(data)
      }
    })
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

//  ejercicio -4 Obtener las razas por pais y todos los datos de premio, raza, perro
router.get("/paisorigen/:pais_de_origen", async (req, res) => {
  const pais_de_origen = req.params.pais_de_origen;
  const results = [];
  const data = "./data/raza_info.csv";
  const url2 = "http://premios:4000/api/v2/premios/"
  const url1 = "http://datosperros:3000/api/v2/datosperros/raza/";
  let result;
  let datosPerros;
  let raza;
  let datospremios;
  fs.createReadStream(data)
    .pipe(csv())
    .on("data", async(data) => {
      results.push(data);
      if(pais_de_origen === pais_de_origen){
        result = results.filter(p => p.pais_de_origen === pais_de_origen)
      }
      
      
    })
    .on("end", async() => {
         raza = result.map(r => r.raza)
         datosPerros = await fetch(url1 + raza.join(",")).then(response => response.json());
         const perrosid = datosPerros.data.map(dato => dato.Id);
          datospremios = await fetch(url2 + perrosid.join(",")).then(response => response.json());
      const response = {
        service: "raza",
        architecture: "microservices",
        raza: result,
        perro: datosPerros,
        premios: datospremios
        
      };
      return res.send(response);
    });
});


// Exportamos el router
module.exports = router;
