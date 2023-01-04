const express = require("express");
const { get } = require("mongoose");
require("../db");
//const AnimalModel = require("../modelos/animales");
const router = express.Router();
const infoAnimal = require("../controllers/animalInfo");
const {verifyToken, isAdmin} = require ('../middlewares/authJwt')

router.post("/", postAnimal);

router.get("/", getAnimales);

router.get('/localidad', getLocalidad); 

router.get('/tama', getTamaño);

router.get('/edad', getEdad); 

router.get('/perro', getPerros);

router.get('/nombre-perro', getPerrosByName);  


router.get('/gato', getGatos);

router.get('/nombre-gato', getGatosByName); 

router.put("/:id", putAnimal);

router.get("/:id", getDetalleAnimal);

router.delete("/:id", deleteAnimal);

module.exports = router;
//