var productModel = require("../../Modules/product");
exports.getallProducts = (req, res) => {
  var productD = productModel.find({});
  productD
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "ok",
        result: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};
exports.sendallproducts = (req, res) => {
  console.log(req.file);

  var productD = new productModel({
    productname: req.body.productname,
    quantity: req.body.quantity,
    price: req.body.price,
    img: req.file.filename,
  });
  productD
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "data sent successfully",
        result: doc,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};
