const mongoose = require("mongoose");
const { Schema } = mongoose;

const comentarioModelSchema = new Schema({
  titulo: {
    type: String,
    require: true,
  },
  contenido: {
    type: String,
    require: true,
  },
  owner: {
    type: String
  }
});

const comentarioModel = mongoose.model("comentario", comentarioModelSchema);
module.exports = comentarioModel;
