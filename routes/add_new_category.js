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
function isuserIn(req, res, next) {
  var token = localStorage.getItem("loginToken");
  if (token) {
    res.redirect("/dashbord");
  }
  next();
}
router.get("/", loginCheck, function (req, res, next) {
  res.render("add_new_category", {
    errors: "",
    cusername: localStorage.getItem("cusername"),
    success: "",
  });
});
router.post(
  "/",
  [body("categoryname", "enter category name").isLength({ min: 1 })],

  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      res.render("add_new_category", {
        cusername: localStorage.getItem("cusername"),
        errors: errors.mapped(),
        success: "",
      });
    } else {
      var categoryD = new categoryModel({
        categoryname: req.body.categoryname,
        cuser: localStorage.getItem("cusername"),
      });
      categoryD.save(function (err, data) {
        if (err) throw err;
        res.render("add_new_category", {
          errors: "",
          cusername: localStorage.getItem("cusername"),
          success: "category added successfully",
        });
      });
    }
  }
);

module.exports = router;
