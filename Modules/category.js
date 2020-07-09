const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Kridzzy:Kridzzy8061@cluster0.ho8gy.mongodb.net/passwordmanagementsystem?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);
var conn = mongoose.Collection;
var categorySchema = mongoose.Schema({
  categoryname: {
    type: String,
    required: true,
  },
  cuser: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
var categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
