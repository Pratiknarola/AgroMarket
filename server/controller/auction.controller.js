const db = require("../model");
const Auction = db.auction;
require("dotenv").config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getauction = (req, res) => {
  Auction.findOne({
    tempId: req.params.tempId,
  }).then((auction) => {
    if (!auction) {
      return res.status(404).send({ message: "Auction Not found." });
    }
    res.status(200).send(auction);
  });
};
