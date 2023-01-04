const express = require("express");
const { get } = require("mongoose");
require("../db");
const router = express.Router();
const infoBlog = require("../controllers/respuestaInfo");

router.post("/", postRespuesta);
router.get("/", getRespuesta);
router.put("/:id", putRespuesta);
router.delete("/:id", deleteRespuesta);

module.exports = router;
