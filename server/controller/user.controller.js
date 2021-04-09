const db = require("../model");
const User = db.user;
const Role = db.role;
const Farmer = db.farmer;
const Crop = db.crop;
const Auction = db.auction;
require("dotenv").config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


// timenow > startdate + duration*60
//startdate < timenow - duration*60
//db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
exports.getpastauctions = async (req, res) => {
  const timenow = Math.floor(Date.now() / 1000);

  const past = Auction.find({startdate: {$lt: timenow}});
  let mypast = [];
  for await (const doc of past) {
    if(timenow > doc.startdate + doc.duration * 60){
      mypast.push(doc);
    }
  }
  res.status(200).send(mypast)
};

exports.getpresentauctions = async (req, res) => {
  const timenow = Math.floor(Date.now() / 1000);

  const present = Auction.find({startdate: {$lt: timenow}});
  let mypresent = [];
  for await (const doc of present) {
    if(timenow < doc.startdate + doc.duration * 60){
      mypresent.push(doc);
    }
  }
  res.status(200).send(mypresent)
};

exports.getfutureauctions = async (req, res) => {
  const timenow = Math.floor(Date.now() / 1000);

  const future = Auction.find({startdate: {$gt: timenow}});
  let myfuture = [];
  for await (const doc of future) {
    if(timenow < doc.startdate){
      myfuture.push(doc);
    }
  }
  res.status(200).send(myfuture)
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.farmerBoard = (req, res) => {
  res.status(200).send("Farmer Content.");
};

exports.buyerBoard = (req, res) => {
  res.status(200).send("Buyer Content.");
};
