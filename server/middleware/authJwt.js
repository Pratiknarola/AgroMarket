const jwt = require("jsonwebtoken");
const db = require("../model");
require("dotenv").config();
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  //   console.log('hit is token',token)
  // console.log('i am in authjwt')

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  //console.log(process.env.JWT_SECRET)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "err!" });
    }
    req.userid = decoded.id;
    // console.log(req.userid + "is the user id");
    // console.log(`decoded id is ${decoded.id}`);

    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userid).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isFarmer = (req, res, next) => {
  User.findById(req.userid).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "farmer") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Farmer Role!" });
        return;
      }
    );
  });
};

isBuyer = (req, res, next) => {
  User.findById(req.userid).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "buyer") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Buyer Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isBuyer,
  isFarmer,
};
module.exports = authJwt;
