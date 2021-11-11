require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const {
  ProductModel,
  accountmodel,
  cartModel,
  orderssModel,
} = require("./models/db_mongoose");
var cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
var multer = require("multer");
require("dotenv").config();
var port = 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "views");
//check đăng nhập hay chưa -> tạo ra biến req.user
const { checkUser } = require("./middlewares/checkUser");
// user = req.user
app.use(checkUser);
// middle ware này dùng để tạo ra biến global cartNum:
const { checkUserCart } = require("./middlewares/checkUserCart");
// set global variable cart
app.use(checkUserCart);

var indexRouter = require("./router/indexRouter");
var filterRouter = require("./router/filterRouter");
var cartRouter = require("./router/cartRouter");
var UserRouter = require("./router/UserRouter");
var productRouter = require("./router/productRouter");
const AdminRouter = require("./router/AdminRouter");

app.use("/public", express.static(path.join(__dirname, "./public")));
app.use("/ckeditor", express.static(path.join(__dirname, "./ckeditor")));

app.use("/", indexRouter);
app.use("/filter", filterRouter);
app.use("/cart", cartRouter);
app.use("/user", UserRouter);
app.use("/product", productRouter);
app.use("/admin", AdminRouter);

app.get("/404", (req, res) => {
  try {
    res.render("admin/404");
  } catch {}
});
app.get("/500", (req, res) => {
  try {
    res.render("admin/500");
  } catch {}
});

app.use("/login", (req, res) => {
  res.render("home/login_signup");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
