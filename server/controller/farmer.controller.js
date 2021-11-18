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

// create a function to convert given string date to time stamp
// example of input: 
// 2021-11-17T17:30:00
// yyyy-mm-ddThh:mm:ss
const toUnixTime = (date) => {
  const dateArr = date.split("T");
  const dateArr2 = dateArr[0].split("-");
  const timeArr = dateArr[1].split(":");
  const year = parseInt(dateArr2[0]);
  const month = parseInt(dateArr2[1]);
  const day = parseInt(dateArr2[2]);
  const hour = parseInt(timeArr[0]);
  const minute = parseInt(timeArr[1]);
  const second = parseInt(timeArr[2]);
  return new Date(year, month - 1, day, hour, minute, second).getTime()/1000;
};


exports.createauction = (req, res) => {
  console.log("data received for auction is : \n ");
  console.log(req.body);
  const auctionid = Math.random().toString(36).substring(2, 15);
  console.log(toUnixTime(req.body.startdate));
  const auction = new Auction({
    
    startdate: toUnixTime(req.body.startdate),  // send unix timestamp
    duration: req.body.duration,      // sen durations in minutes
    harvestdate: req.body.harvestdate,   // send as recieved from frontend
    crop: req.body.crop.id,    //  send crop id 
    quantity: Number(req.body.quantity),     // send as integer
    owner: req.userid,        
    description: req.body.description,  
    startprice: Number(req.body.startprice),      // send as number
    bids: [
      {
        bidby: req.userid,
        bidprice: Number(req.body.startprice),       // send as number
        time: toUnixTime(req.body.startdate),    //  send unix timestamp
      },
    ],
    tempId: auctionid,
  });

  console.log("auction created", auction);

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
  console.log("this is request.params", req.params);

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
