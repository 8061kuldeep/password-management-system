var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var add_new_passwordRouter = require("./routes/add_new_password");
var dashbordRouter = require("./routes/dashbord");
var view_all_categoryRouter = require("./routes/view_all_category");
var view_all_passwordRouter = require("./routes/view_all_password");
var indexRouter = require("./routes/index");
var signupRouter = require("./routes/signup");
var testapiRouter = require("./api/testapi");
var userapiRouter = require("./api/user");
//var productRouter = require("./api/products");
var usersRouter = require("./routes/users");
var add_new_categoryRouter = require("./routes/add_new_category");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/api", testapiRouter);
//app.use("/product", productRouter);
app.use("/add_new_password", add_new_passwordRouter);
app.use("/view_all_category", view_all_categoryRouter);
app.use("/view_all_password", view_all_passwordRouter);
app.use("/dashbord", dashbordRouter);
app.use("/add_new_category", add_new_categoryRouter);
app.use("/users", usersRouter);
app.use("/userapi", userapiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  // res.status(401).json({
  //   error: "page not found",
  // });
});

module.exports = app;
