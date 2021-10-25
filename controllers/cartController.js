const { accountmodel, orderssModel } = require("../models/db_mongoose");
const UserAddressModel = require("../models/addressModel");
const jwt = require("jsonwebtoken");

// update cart
module.exports.postCart = async (req, res) => {
  const token = req.cookies.user;
  const id = jwt.verify(token, "Auth").id;
  const keys = Object.keys(req.body);
  const productInfo = keys.filter((ele) => {
    return ele.includes("prd");
  });
  let product = [];
  for (let i = 0; i < productInfo.length; i += 2) {
    product.push({
      productId: req.body[productInfo[i]],
      quantity: req.body[productInfo[i + 1]],
    });
  }
  try {
    const data = await accountmodel.findOneAndUpdate(
      { _id: id },
      {
        Cart: product,
      }
    );
    res.json({ mess: "Cập nhật giỏ hàng thành công", status: 200, data: data });
  } catch (error) {
    res.json(error);
  }
};

// create order

module.exports.postOrder = async (req, res, next) => {
  const token = req.cookies.user;
  const id = jwt.verify(token, "Auth").id;
  try {
    const cart = await accountmodel.findOne({ _id: id });
    const data = await orderssModel.create({
      product: cart.Cart,
      userId: id,
      totalPrice: req.body.totalPrice,
      orderDate: Date.now().toString(),
    });
    res.json({ mess: "Tao don hàng thành công", status: 200, data: data });
    next();
  } catch (error) {
    res.json(error);
  }
};

module.exports.postAddress = async (req, res, next) => {
  const address = req.body.address;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const token = req.cookies.user;
  const id = jwt.verify(token, "Auth").id;

  try {
    const addressData = await UserAddressModel.findOne({ userId: id });
    if (addressData) {
      next();
    } else {
      UserAddressModel.create({
        userId: id,
        address: address,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      });
      next();
    }
  } catch (error) {
    res.json(error);
  }
};
