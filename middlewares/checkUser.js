const { accountmodel } = require("../models/db_mongoose");
const jwt = require("jsonwebtoken");

module.exports.checkUser = async (req, res, next) => {
  try {
    //lấy mã token nằm trong cookie của user
    const token = req.cookies.user;
    //giải mã token
    const result = jwt.verify(token, "Auth");
    //tìm user theo id vừa đc giải mã
    const user = await accountmodel.findById(result.id);
    //set global user
    req.user = user;

    next();
  } catch (error) {
    req.user = null;
    next();
  }
};
