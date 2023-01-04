const mongoose = require("mongoose");
const { Schema } = mongoose;

const LocationSchema = new Schema({
  lng: String,
  lat: String,
  }
);

const locationModel = mongoose.model("location", LocationSchema);
module.exports = locationModel;
