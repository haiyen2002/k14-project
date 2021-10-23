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

app.set("view engine", "ejs");
app.set("views", "views");

var indexRouter = require("./router/indexRouter");
var filterRouter = require("./router/filterRouter");
const RouterHome = require("./router/RouterHomeAdmin");
const Router = require("./router/RouterAdmin");
const userRouter = require("./router/UserRouter");
app.use("/", indexRouter);
app.use("/filter", filterRouter);
app.use("/admin", RouterHome);
app.use("/check", Router);
app.use("/user", userRouter);
app.use("/public", express.static(path.join(__dirname, "./public")));

app.get("/admin/login", async (req, res) => {
  try {
    res.render("admin/login");
  } catch {}
});
app.get("/admin", async (req, res) => {
  try {
    res.render("admin/login");
  } catch {}
});

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
app.get("/changeprofile", (req, res) => {
  try {
    res.render("user/editprofile");
  } catch {}
});
app.get("/changepass", (req, res) => {
  try {
    res.render("user/changepass");
  } catch {}
});

app.use("/login", (req, res) => {
  res.render("home/login_signup");
});
app.use("/sigin", (req, res) => {
  res.render("home/login_signup");
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
