const express = require("express");
const { get } = require("mongoose");
require("../db");
const router = express.Router();
const infoLostLocation = require("../controllers/lostLocationInfo");

router.post("/", postLostLocation);

router.get("/", getLostLocation);

// router.delete("/:id", deleteLostLocation);

module.exports = router;
