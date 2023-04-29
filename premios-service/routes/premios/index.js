const express = require("express");
const fetch = require("node-fetch");
const {Sequelize} = require('sequelize');

//const User = require('../models/Users.js');
const Premios = require('../../model/Premios.js');


const router = express.Router();

router.use(express.json());

router.get("/", async(req, res)=>{
    const premios = await Premios.findAll();
    const response = {
        premios
    }
    res.send(response);
})

router.get("/:id", async(req, res)=>{
    const id = req.params.id;
    const premios = await Premios.findByPk(id);
    const response = {
        premios
    }
    res.send(response);
})

// Obtener todos los premios ganados en un país específico y los datos de los perros
router.get("/pais/:pais", async(req, res)=>{
    const pais = req.params.pais;
    const premios = await Premios.findAll({
        where: {
            pais_competencia: pais
        }
    });
    const  id_campeon= premios.map(premio => premio.id_campeon)
    const url1 = "http://datosperros:3000/api/v2/datosperros/detalleperro/";
    const datosPerro = await fetch(url1 +id_campeon.join(",")).then(response => response.json());
    const razas = datosPerro.data.map(raza => raza.raza);
    const url2 = "http://raza:5000/api/v2/raza/raza/"
    const datosRaza = await fetch(url2 +razas.join(",")).then(response => response.json());
    const response = {
        premios,
        datosRaza
    }
    res.send(response);
})

module.exports = router;