const express = require("express");
const app = express();
const path = require("path");
var cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
var multer = require("multer");
require("dotenv").config();
var port = 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//ejs
app.set("view engine",'ejs');
app.set("views", "views");

var indexRouter = require('./router/indexRouter');
var filterRouter = require('./router/filterRouter')
app.use('/', indexRouter);
app.use('/filter',filterRouter);

app.use("/public", express.static(path.join(__dirname, "./public")));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
