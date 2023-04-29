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

module.exports = router;