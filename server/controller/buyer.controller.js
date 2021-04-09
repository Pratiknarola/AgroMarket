const db = require("../model");
const User = db.user;
const Role = db.role;
const Farmer = db.farmer;
const Crop = db.crop;
const Auction = db.auction;
require("dotenv").config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.addbid = (req, res) => {
  console.log("data received for adding the bid is: \n");
  console.log(req.body);

  const auctionid = req.body.auctionid;

  Auction.findById(auctionid)
    .then((auction) => {
      auction.bids.push({
        bidby: req.userid,
        bidprice: req.body.bidprice,
        time: req.body.time,
      });
      console.log("i found the auction for bid to place in");
      auction.save((err, auction) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log("bid added to auction successfully.");
      });
      let flag = false;
      User.findById(req.userid).then((user) => {
        user.auctionsParticipated.forEach((element) => {
          console.log(element + " is the element " + auctionid);
          if (element == auctionid) {
            flag = true;
          }
        });
        if (!flag) {
          user.auctionsParticipated.push(auctionid);
          user.save();
        }
        res.status(200).send("bid added to auction successfully.");
      });
    })
    .catch((err) => {
      res.status(404).send("Auction not found");
    });
};
