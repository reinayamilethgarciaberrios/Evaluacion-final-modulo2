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
router.get("/", async(req, res)=>{
    const id = req.params.id;
    const premios = await Premios.findByPk(id);
    const response = {
        premios
    }
    res.send(response);
})

router.get("/:id", async(req, res)=>{
    const Op = Sequelize.Op;
    const id = req.params.id.split(",");
    const premios = await Premios.findAll({
        where: {
          id: {
            [
      Op.in
      ]: id
          }
        }
    });
    const response = {
        
        premios
        
    }
    res.send(response);
})

router.get("/idCampeon/:id", async(req, res)=>{
    const reqId = req.params.id.split(",");
    let campeonatos = await Campeonatos.findAll();
    campeonatos = campeonatos.filter(campeonato => reqId.includes(String(campeonato.id_campeon)));
    const response = {
        campeonatos
    }
    res.send(response);
})
module.exports = router;