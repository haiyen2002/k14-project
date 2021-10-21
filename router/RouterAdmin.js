const router = require("express").Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const model = require("../models/db_mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });

module.exports = router;
