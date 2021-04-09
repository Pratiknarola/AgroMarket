const db = require("../model");
const User = db.user;
const Role = db.role;
require('dotenv').config();
const nodemailer = require('./nodemailer.config');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

  const confirmtoken = jwt.sign({email: req.body.email}, process.env.CONFIRM_SECRET)
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmationCode: confirmtoken
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
            nodemailer.sendConfirmationEmail(
              user.username,
              user.email,
              user.confirmationCode
            );
			console.log("EMail sent");
          });
        }
      );
    } else {
      Role.findOne({ name: "buyer" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Buyer was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (user.status != "Active"){
        return res.status(401).send({
          message: "Pending account. Please verify your email!!"
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push(user.roles[i].name); 
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
      console.log('response set')
    });
};

exports.verifyUser = (req, res, next) => {
	console.log("i got req as ");
	console.log(req.params);
	User.findOne({
	  confirmationCode: req.params.confirmationCode,
	})
	  .then((user) => {
		if (!user) {
		  return res.status(404).send({ message: "User Not found." });
		}
  
		user.status = "Active";
		user.save((err) => {
		  if (err) {
			res.status(500).send({ message: err });
			return;
		  }
		});

		res.status(200).send({message: "Email verified!! You can login now."});
	  })
	  .catch((e) => console.log("error", e));
  };
