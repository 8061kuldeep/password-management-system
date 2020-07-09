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
  var cusername = localStorage.getItem("cusername");
  var category = categoryModel.find({ cuser: cusername });
  category.exec(function (err, data) {
    if (err) throw err;
    res.render("view_all_category", {
      cusername: localStorage.getItem("cusername"),
      records: data,
    });
  });
});
router.get("/edit/:id", function (req, res) {
  var selectedCat = categoryModel.findById(req.params.id);
  console.log(req.params.id);
  selectedCat.exec(function (err, data) {
    if (err) throw err;
    res.render("update", {
      cusername: localStorage.getItem("cusername"),
      errors: "",
      success: "",
      records: data,
    });
  });
});
router.post("/", function (req, res) {
  var selectedCat = categoryModel.findByIdAndUpdate(req.body.id, {
    categoryname: req.body.categoryname,
  });

  selectedCat.exec(function (err, data) {
    if (err) throw err;
    res.redirect("/view_all_category");
  });
});
router.get("/delete/:id", function (req, res) {
  var selectedCat = categoryModel.findByIdAndDelete(req.params.id);

  selectedCat.exec(function (err, data) {
    if (err) throw err;
    res.redirect("/view_all_category");
  });
});

module.exports = router;
