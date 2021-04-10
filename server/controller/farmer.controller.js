const db = require("../model");
const Pusher = require("pusher");
const User = db.user;
const Role = db.role;
const Farmer = db.farmer;
const Crop = db.crop;
const Auction = db.auction;
require("dotenv").config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createauction = (req, res) => {
  console.log("data received for auction is : \n ");
  console.log(req.body);
  const auctionid = Math.random().toString(36).substring(2, 15);

  const auction = new Auction({
    startdate: req.body.startdate,
    duration: req.body.duration,
    harvestdate: req.body.harvestdate,
    crop: req.body.crop,
    quantity: req.body.quantity,
    owner: req.userid,
    description: req.body.description,
    startprice: req.body.startprice,
    bids: [
      {
        bidby: req.userid,
        bidprice: req.body.startprice,
        time: req.body.startdate,
      },
    ],
    tempId: auctionid,
  });

  auction.save((err, auctiondoc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log("Auction is sccheduled by farmer and added to datbase");
    console.log("auction id is" + auctiondoc._id);
    User.findById(req.userid).then((user) => {
      user.auctionsParticipated.push(auctiondoc._id);
      user.save();
    });

    // const pusher = new Pusher({
    //   appId: process.env.PUSHER_APPID,
    //   key: process.env.PUSHER_KEY,
    //   secret: process.env.PUSHER_SECRET,
    //   cluster: process.env.PUSHER_CLUSTER,
    //   useTLS: true,
    // });
    // const channel = "auctions";
    // const changestream = Auction.watch();
    // changestream.on("change", (change) => {
    //   console.log(change);
    //   if (change.operationType === "update") {
    //     const task = change.fullDocument;
    //     pusher.trigger(channel, "updated", {
    //       eventid: change._id,
    //       auctionid: task._id,
    //       bids: task.bids,
    //     });
    //   }
    // });
    res.status(200).send({ message: "Auction was added successfully" });
  });
};

exports.getcroplist = (req, res) => {
  console.log("data received for getcroplist is : \n ");
  console.log(req.params);

  User.findOne({
    username: req.params.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: "Error!" });
    }
    if (!user) {
      res.status(404).send({ message: "User not found!" });
    }

    let userid = user._id;
    const farmer = Farmer.findOne({
      id: userid,
    })
      .populate("crops")
      .exec((err, farmeruser) => {
        if (err) {
          res.status(500).send({ message: "Error! populate" });
        }
        console.log(farmeruser);
        res.status(200).send(farmeruser);
      });
  });
};
