const {cartModel} = require("../models/db_mongoose");

module.exports.postCart = async (req, res) => {
  const user = req.body.user;
  const product = req.body.product;
  const status = req.body.status;
  try {
    const data = await cartModel.create({
      userId: user,
      product: product,
      status: status,
    });
    res.json({mess: "tao don hang thanh cong", status: 200, data: data});
  } catch (error) {
    res.json(error);
  }
};
