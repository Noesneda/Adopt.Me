const mongoose = require("mongoose");
const { Schema } = mongoose;

const RespuestaModelSchema = new Schema({
  respuesta: {
    type: String,
    required: false,
  },
  caquina: {
    type: String,
  }, 
  respuestaOwner: {
    type: String
  }
});

const RespuestaModel = mongoose.model("respuesta", RespuestaModelSchema);
module.exports = RespuestaModel;
