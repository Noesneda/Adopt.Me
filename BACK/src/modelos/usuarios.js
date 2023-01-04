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
    unique: true
  },
  contrasena: {
    type: String
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
  roles: [{
    ref: 'roles',
    type: Schema.Types.ObjectId
  }],
  // status: {
  //   type: String,
  //   required: true,
  //   default: 'UNVERIFIED'
  // }
});

// METODO PARA HASHEAR CONTRASEÑA
// UsuarioSchema.methods.encryptPassword = async (contrasena) => {
//   return bcrypt.hashSync(contrasena, bcrypt.genSaltSync(10));
// };

// // METODO PARA TOMAR LA CONTRASEÑA Y HASHEARLA PARA COMPARARLA CON LA HASHEADA EN LA DB
// UsuarioSchema.statics.compareContraseña = async (contrasena, recibeContraseña) => {
//   return await bcrypt.compare(contrasena, recibeContraseña);
// };

const UsuarioModel = mongoose.model("usuarios", UsuarioSchema);
module.exports = UsuarioModel;
