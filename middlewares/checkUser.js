const { accountmodel } = require("../models/db_mongoose");
const jwt = require("jsonwebtoken");

module.exports.checkUser = async (req, res, next) => {
  try {
    const token = req.cookies.user;
    const result = jwt.verify(token, "Auth");
    const user = await accountmodel.findById(result.id);

    req.user = user;

    next();
  } catch (error) {
    req.user = null;
    next();
  }
};
