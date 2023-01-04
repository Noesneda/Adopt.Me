const express = require("express");
const { get } = require("mongoose");
require("../db");
const router = express.Router();
const infoLocation = require("../controllers/locationInfo");

router.post("/", postLocation);

router.get("/", getLocation);

router.delete("/:id", deleteLocation);

module.exports = router;
