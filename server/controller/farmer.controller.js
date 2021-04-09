const db = require("../model");
const User = db.user;
const Role = db.role;
const Farmer = db.farmer;
const Crop = db.crop;
const Auction = db.auction;
require("dotenv").config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createauction = (req,res) => {

    console.log("data received for auction is : \n ");
    console.log(req.body);
    const auctionid = Math.random().toString(36).substring(2, 15);

    const auction = new Auction(
        {
            startdate : req.body.startdate,
            duration : req.body.duration,
            harvestdate : req.body.harvestdate,
            crop : req.body.crop,
            quantity : req.body.quantity,
            owner : req.userid,
            description : req.body.description,
            startprice : req.body.startprice,
            bids : [],
            tempId: auctionid
        }
    );

    auction.save((err,auctiondoc)=>{

        if(err){
            res.status(500).send({message: err});
            return;
        }

        console.log("Auction is sccheduled by farmer and added to datbase");
        console.log("auction id is" + auctiondoc._id);

        res.status(200).send({message: "Auction was added successfully"})

    });


};