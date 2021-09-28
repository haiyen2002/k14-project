const ModelMongo = require("../models/db_mongoose");
const jwt = require("jsonwebtoken");
function checkcookie(req, res, next) {
  let token = req.cookies.token;
  token = jwt.verify(token, "checklogin");
  ModelMongo.accountModel
    .findOne({
      $and: [{ _id: token._id }],
    })
    .then((data) => {
      req.data = data;
      next();
    })
    .catch((error) => {
      res.status(500).json("loi sever");
    });
}
module.exports = { checkcookie };
