const express = require("express");
const app = express();
const path = require("path");

var cookieParser = require("cookie-parser");
const indexRouter = require("./router/indexRouter");
const UserRouter = require("./router/UserRouter");
const productRouter = require("./router/productRouter");

const {
  ProductModel,
  accountmodel,
  cartModel,
  orderssModel,
  BlackListModel,
} = require("./models/db_mongoose");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

app.set("view engine", "ejs");

app.use("/public", express.static(path.join(__dirname, "./public")));

app.use("/", indexRouter);
app.use("/user", UserRouter);
app.use("/product", productRouter);

app.listen(process.env.PORT || 3000);
