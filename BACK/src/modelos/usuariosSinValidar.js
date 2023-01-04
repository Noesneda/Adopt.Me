const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const UsuarioSchema = new Schema({
  usuario: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  contrasena: {
    type: String,
    required: false,
  },
  fotoPerfil: {
    type: String,
  },
  telefono: {
    type: String,
  },
  localidad: {
    type: String,
  },
  nacimiento: {
    type: String,
  },
  publicaciones: {
    type: String,
  },
  caca: {
    type: String,
  },
  roles: [
    {
      ref: "roles",
      type: Schema.Types.ObjectId,
    },
  ],
});

const UsuariosSinValidar = mongoose.model("usuariosSinValidar", UsuarioSchema);
module.exports = UsuariosSinValidar;
