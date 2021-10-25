const mongoose = require("mongoose");

const Crop = mongoose.model(
  "Crop",
  new mongoose.Schema({
    name: String,
    image: String,
    rating: Number,
  })
);

module.exports = Crop;
