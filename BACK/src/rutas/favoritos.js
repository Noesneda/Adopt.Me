const express = require("express");
const { get } = require("mongoose");
require("../db");
const router = express.Router();
const favoritosInfo = require("../controllers/favoritos");

router.post("/", postFavoritos);
router.get("/", getFavoritos);

module.exports = router;