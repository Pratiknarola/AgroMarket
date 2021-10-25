const mongoose = require("mongoose");

const Buyer = mongoose.model(
  "Buyer",
  new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pastPurchase: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auction",
      },
    ],
  })
);

module.exports = Buyer;
