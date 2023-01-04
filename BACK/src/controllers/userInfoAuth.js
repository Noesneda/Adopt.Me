const UsuariosSinValidar = require("../modelos/usuariosSinValidar");
const UsuarioModel = require("../modelos/usuarios");
const { roleModel } = require("../modelos/roles");
const infoUserAuth = {};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

postSignup = async (req, res) => {
  const {
    contrasena,
    nombre,
    usuario,
    mail,
    telefono,
    localidad,
    fotoPerfil,
    nacimiento,
    roles,
  } = req.body;

  // const existente = UsuarioModel.find({email})
  const newUser = new UsuariosSinValidar({
    nombre,
    usuario,
    mail,
    telefono,
    localidad,
    fotoPerfil,
    nacimiento,
    roles,
    contrasena,
  });

  if (roles) {
    const encuentraRole = await roleModel.findOne({ nombre: { $in: roles } });

    newUser.roles = encuentraRole;
  } else {
    const rol = await roleModel.findOne({ nombre: "user" });
    newUser.roles = [rol._id];
  }
  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, SECRET, {
    expiresIn: 86400,
  });

  res.status(200).json(token);
};

postSignin = async (req, res) => {
  const userFound = await UsuarioModel.findOne({
    mail: req.body.mail,
  }).populate("roles");

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  const match = await UsuarioModel.compareContraseña(
    req.body.contrasena,
    userFound.contrasena
  );
  if (!match)
    return res
      .status(401)
      .json({ token: null, message: "Contraseña inválida" });

  const token = jwt.sign({ id: userFound._id }, SECRET, {
    expiresIn: 86400,
  });

  res.json({ token, userFound });
};

postSignupGoogle = async (req, res) => {
  UsuarioModel.findOne({ usuario: req.body.usuario }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("El usuario ya existe");
    if (!doc) {
      const usuarioNuevo = new UsuarioModel({
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        mail: req.body.mail,
        telefono: req.body.telefono,
        localidad: req.body.localidad,
        fotoPerfil: req.body.fotoPerfil,
        nacimiento: req.body.nacimiento,
        caca: req.body.caca,
      });
      await usuarioNuevo.save();
      res.send("Usuario creado exitosamente");
    }
  });
};

getUserGoogle = async (req, res) => {
  const { id } = req.params;
  try {
    let userId = await UsuarioModel.findOne({ caca: id });
    if (userId) {
      let u = await userId.save();
      res.status(200).json(u);
    } else {
      res.status(400).json(`${id} no encontrado`);
    }
  } catch (error) {
    res.status(400).json(`${id} no encontrado`);
  }
};

module.exports = infoUserAuth;
