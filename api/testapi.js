var express = require("express");
var router = express.Router();
var userModel = require("../Modules/user");
var productModel = require("../Modules/product");
var multer = require("multer");
var productController = require("./controller/product");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
router.post(
  "/products/post",
  upload.single("img"),
  productController.sendallproducts
);
router.get("/products/get", productController.getallProducts);
router.get("/get", function (req, res) {
  var userD = userModel.find({});
  userD
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "success",
        result: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});
router.put("/put/:id", function (req, res) {
  // var userD = userModel.findByIdAndUpdate(req.params.id, {
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  // userD.exec(function (err, data) {
  //   if (err) throw err;
  //   res.send("data updated to server successfully");
  // });
  userModel.findById(req.params.id, function (err, data) {
    var usernameM = req.body.username;
    // var emailM = req.body.email;
    // var passwordM = req.body.password;
    data.username = usernameM ? usernameM : data.username;
    // data.email = emailM ? emailM : data.email;
    // data.password = passwordM ? passwordM : data.password;
    data.save(function (err, data) {
      if (err) throw err;
      res.status(200).json({
        message: "data updated  successfully",
        result: data,
      });
    });
  });
});
router.patch("/patch/:id", function (req, res) {
  var userD = userModel.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  userD.exec(function (err, data) {
    if (err) throw err;
    res.send("data updated to server successfully");
  });
});
router.post("/post", function (req, res) {
  var userD = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  userD
    .save()
    .then((doc) => {
      res.status(201).json({
        message: "data inserted successfuly",
        result: doc,
      });
    })
    .catch((err) => {
      message: "err ducblicate data";
      res.json(err);
    });
});
router.delete("/delete/", function (req, res) {
  userModel
    .findByIdAndRemove(req.body.id)
    .then((doc) => {
      res.status(200).json({
        message: "data deleted successfully",
        doc: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
