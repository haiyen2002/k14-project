const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const check = require("./controllers/checkAuth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RouterHome = require("./router/RouterHomeAdmin");
const Router = require("./router/RouterAdmin");
const userRouter = require("./router/UserRouter");
var indexRouter = require("./router/indexRouter");
var cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "./public")));
app.use("/admin", RouterHome);
app.use("/check", Router);
app.use("/user", userRouter);
app.use("/", indexRouter);

app.get("/admin/login", async (req, res) => {
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
// End Router Admin
app.listen(process.env.PORT || 7777, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
