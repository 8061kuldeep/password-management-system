var express = require("express");
var router = express.Router();
var bcryptjs = require("bcryptjs");
var userModel = require("../Modules/user");
var passwordModel = require("../Modules/password");
var categoryModel = require("../Modules/category");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

router.use(express.static(__dirname + "./public/"));
router.get("/", isuserIn, function (req, res, next) {
  res.render("index", { msg: "" });
});
router.post("/", function (req, res) {
  var cuser = userModel.findOne({ username: req.body.username });

  cuser.exec(function (err, data) {
    if (data) {
      if (err) throw err;
      var cusername = data.username;
      var cuserId = data._id;
      var cuserpassword = data.password;
      if (bcryptjs.compareSync(req.body.password, cuserpassword)) {
        var token = jwt.sign(
          {
            userId: cuserId,
            
          },
          "loginToken"
        );
        localStorage.setItem("loginToken", token);
        localStorage.setItem("cusername", cusername);
        res.redirect("/dashbord");
      } else {
        res.render("index", {
          msg: "wrong password",
        });
      }
    } else {
      res.render("index", {
        msg: "Not a user please register",
      });
    }
  });
});
function loginCheck(req, res, next) {
  var loginToken = localStorage.getItem("loginToken");
  try {
    var decoded = jwt.verify(loginToken, "loginToken");
  } catch (err) {
    res.redirect("/");
  }
  next();
}
function checkEmail(req, res, next) {
  var email = userModel.findOne({ email: req.body.email });
  email.exec(function (err, data) {
    if (err) throw err;
    if (data) {
      return res.render("signup", { msg: "email aready exits" });
    }
    next();
  });
}
function checkUser(req, res, next) {
  var email = userModel.findOne({ username: req.body.username });
  email.exec(function (err, data) {
    if (err) throw err;
    if (data) {
      return res.render("signup", {
        msg: "user aready exits make some change in name",
      });
    }
    next();
  });
}

router.get("/logout", function (req, res) {
  localStorage.removeItem("loginToken");
  localStorage.removeItem("cusername");
  res.redirect("/");
});
function isuserIn(req, res, next) {
  var token = localStorage.getItem("loginToken");
  if (token) {
    res.redirect("/dashbord");
  }
  next();
}
module.exports = router;
