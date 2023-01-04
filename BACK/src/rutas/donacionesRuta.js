const express = require("express");
require("../db");
const router = express.Router();
const donaciones = require ("../controllers/donaciones")

router.post("/", postDonaciones);
router.get("/pagos", getDonaciones);


module.exports = router;
