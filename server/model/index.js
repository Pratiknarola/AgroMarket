const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.auction = require("./auction.model");
db.buyer = require("./buyer.model");
db.crop = require("./crop.model");
db.farmer = require("./farmer.model");

db.ROLES = ["farmer", "admin", "buyer"];

module.exports = db;
