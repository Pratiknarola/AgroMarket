const mongoose = require("mongoose");

const Farmer = mongoose.model(
  "Farmer",
  new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    crops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crop",
      },
    ],
  })
);

module.exports = Farmer;
