const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Kridzzy:Kridzzy8061@cluster0.ho8gy.mongodb.net/passwordmanagementsystem?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);
var conn = mongoose.Collection;
var productSchema = mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});
var productModel = mongoose.model("products", productSchema);
module.exports = productModel;
