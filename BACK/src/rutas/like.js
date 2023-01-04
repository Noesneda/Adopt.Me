const express = require("express");
require("../db");
const router = express.Router();
const likes = require("../controllers/likes");

router.post("/", postLike);

router.get("/", getLike);

router.delete("/:id", deleteLike);

module.exports = router;