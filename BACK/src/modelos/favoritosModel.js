const mongoose = require("mongoose");
const { Schema } = mongoose;

const favoritosModelSchema = new Schema({
  favoritos: {
    type: String
  },
  userFav: {
    type: String
  },
  nombre: {
    type: String,
  }, 
});

const favoritosModel = mongoose.model("favoritos", favoritosModelSchema);
module.exports = favoritosModel;
