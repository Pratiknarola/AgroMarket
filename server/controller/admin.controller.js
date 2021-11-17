const db = require("../model");
const User = db.user;
const Role = db.role;
const Farmer = db.farmer;
const Crop = db.crop;
require("dotenv").config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.addcrop = (req, res) => {
  //console.log(req.body)
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    if (user.status != "Active") {
      return res.status(401).send({
        message: "Pending account. Please verify your email!!",
      });
    }

    var objId = user._id;
    Farmer.findOne({
      id: objId,
    }).exec((err, farmeruser) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!farmeruser) {
        return res.status(404).send({ message: "Farmer User Not found." });
      }
      const crop = new Crop({
        name: req.body.cropName,
        image: "",
        rating: req.body.rating,
      });
      crop.save((err, cropdoc) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log("farmeruser's id is");
        console.log(farmeruser._id);
        farmeruser.crops.push(cropdoc._id);
        farmeruser.save((err, farmeruser) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          console.log("farmer saved successfully.");
        });
        /*db.farmer.update(
                        {_id: farmeruser._id},
                        {$push: {crops: cropdoc._id}}
                    );*/
        console.log("crop added.");
        console.log(cropdoc);
      });
      res.status(200).send({ message: "Crop was added successfully" });
    });
  });
};
