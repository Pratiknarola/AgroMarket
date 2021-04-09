
const mongoose = require("mongoose");

const Bid = mongoose.model(
    "Bid",
    new mongoose.Schema({
      bidby : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }, 
      bidprice : Number,
      time : Number,
      auction : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Auction"
      }
    })
  );

module.exports = Bid;
