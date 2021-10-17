const {cartModel} = require("../models/db_mongoose");
const jwt = require("jsonwebtoken");

// tạo đơn hàng
module.exports.postCart = async (req, res) => {
  const token = req.cookies.user;
  const userId = jwt.verify(token, "teamk14").id;
  const product = req.body.product;
  const status = req.body.status;
  try {
    const data = await cartModel.create({
      userId: userId,
      product: product,
      status: status,
    });
    res.json({mess: "tao don hang thanh cong", status: 200, data: data});
  } catch (error) {
    res.json(error);
  }
};
