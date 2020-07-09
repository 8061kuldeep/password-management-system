var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var userModel = require("../Modules/user");
router.post("/post", function (req, res) {
  if (req.body.password != req.body.confpassword) {
    res.json({
      error: "password does not match",
    });
  } else {
    var userD = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      confpassword: req.body.confpassword,
    });
    userD
      .save()
      .then((doc) => {
        res.status(200).json({
          message: "data inserted successfully",
          resuclt: doc,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  }
});
router.get("/get", function (req, res) {
  var userD = userModel.find({});
  userD
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "ok",
        resuclt: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/login", function (req, res) {
  userModel
    .find({ username: req.body.username })
    .exec()
    .then((doc) => {
      if (doc.length < 1) {
        res.json({
          message: "user is not registerd",
        });
      } else {
        if (bcrypt.compareSync(req.body.password, doc[0].password)) {
          var token = jwt.sign({ username: doc[0].username }, "loginToken", {
            expiresIn: "1h",
          });
          console.log(token);
          res.json({
            message: "password is correct",
          });
        } else {
          res.json({
            message: "password is incorect",
          });
        }
      }
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
});
module.exports = router;
