const router = require("express").Router();
const path = require("path");
const check = require("../controllers/checkAuth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    res.render("admin/widget");
  } catch {}
});

router.post;

module.exports = router;
