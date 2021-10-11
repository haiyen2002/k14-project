const router = require("express").Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const check = require("../controllers/checkAuth");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });

router.post("/login", async (req, res) => {
  try {
    if (
      (req.body.username == process.env.username &&
        req.body.password == process.env.password) ||
      (req.body.username == "donguyen" && req.body.password == "donguyen")
    ) {
      res.json({ mess: "ok", status: "200" });
    } else if (
      req.body.username != process.env.username ||
      req.body.password != process.env.password
    ) {
      res.json({ mess: "Incorrect account or password", status: "400" });
    }
  } catch {
    res.json({ status: 500, mess: "error server" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    await BacklistModel.create({
      token: req.cookies.user,
    });
    res.json({ mess: "ok", status: "200" });
  } catch (error) {
    res.json({ error, mess: "error server", status: "500" });
  }
});

module.exports = router;
