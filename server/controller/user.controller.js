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
exports.getpastauctions = (req, res) => {
  const timenow = Math.floor(Date.now() / 1000)
  const past = Auction.find( { startdate : {$lt : timenow} }).filter((elem) => {
    return timenow > elem.startdate + elem.duration*60;
  });
  res.status(200).send(past)
};

exports.getpresentauctions = (req, res) => {
  const timenow = Math.floor(Date.now() / 1000)
  const present = Auction.find( { startdate : {$lt : timenow} }).filter((elem) => {
    return timenow < elem.startdate + elem.duration*60;
  });
  res.status(200).send(present)
};

exports.getfutureauctions = (req, res) => {
  const timenow = Math.floor(Date.now() / 1000)
  const future = Auction.find( { startdate : {$lt : timenow} }).filter((elem) => {
    return timenow < elem.startdate;
  });
  res.status(200).send(future)
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
