const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeModelSchema = new Schema({
 likes: {
    type: Number,
 }
});

const likeModel = mongoose.model("like", likeModelSchema);
module.exports = likeModel;
