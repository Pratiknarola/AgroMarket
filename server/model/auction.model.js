const mongoose = require("mongoose");

const Auction = mongoose.model(
    "Auction",
    new mongoose.Schema({
        startdate: Number,
        duration: Number,
        harvestdate: Date,
        crop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Crop",
        },
        tempId: {
            type: String,
            unique: true
        },
        quantity: Number,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        description: String,
        startprice: Number,
        bids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bid",
        }]
    })
);

module.exports = Auction;
