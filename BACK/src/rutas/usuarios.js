const express = require("express");
require("../db");
const UsuarioModel = require("../modelos/usuarios");
const UsuariosSinValidar = require("../modelos/usuariosSinValidar");
const router = express.Router();
const infoUser = require("../controllers/userInfo");
const bcrypt = require("bcryptjs");
const infoUserAuth = require("../controllers/userInfoAuth");
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const checkRoles = require("../middlewares/verifyRoles");

router.post("/", [verifyToken, checkRoles], postUsuario);

router.get("/getUserSinValidar/:id", getUserSinValidar);

router.get("/", getUsuarios);

router.get("/:id", getDetalleUsuario);

router.put("/:id", putUsuario);

router.delete("/:id", deleteUsuario);

// crear ruta postVerificado, controller, action, reducer, despachar la action desde componente validacion, acomodar cartelito
router.post("/postUsuario", postUsuario)

router.post("/signup", postSignup);

router.post("/signin", postSignin);

router.post("/google/signup", postSignupGoogle);

router.post("/crearUsuarioValidado", crearUsuarioValidado)

router.get("/google/:id", getUserGoogle);

router.post("/mailVerificarUsuario", mailVerificarUsuario);

router.post("/emailInfoAdoptante", emailInfoAdoptante);

// router.put("/confirmar_email/:token", putVerificacion);

module.exports = router;
