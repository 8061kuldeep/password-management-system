const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Kridzzy:Kridzzy8061@cluster0.ho8gy.mongodb.net/passwordmanagementsystem?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);
var conn = mongoose.Collection;
var passwordSchema = mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  passDetails: {
    type: String,
    required: true,
  },
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
var passwordModel = mongoose.model("passwordDetails", passwordSchema);
module.exports = passwordModel;
