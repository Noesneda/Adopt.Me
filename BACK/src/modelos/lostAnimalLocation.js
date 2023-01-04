const mongoose = require("mongoose");
const { Schema } = mongoose;

const lostLocationSchema = new Schema({
  lng: String,
  lat: String,
});

const lostLocationModel = mongoose.model("lostlocation", lostLocationSchema);
module.exports = lostLocationModel;
