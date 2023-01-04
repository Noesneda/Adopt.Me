const mongoose = require("mongoose");
const { Schema } = mongoose;

const donacionesSchema = new Schema({
  donacion: {
    type: Number,    
  },

});

const donacionesModel = mongoose.model("donaciones", donacionesSchema);
module.exports = donacionesModel;
