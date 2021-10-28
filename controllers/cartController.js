const {
  accountmodel,
  orderssModel,
  ProductModel,
} = require("../models/db_mongoose");
const UserAddressModel = require("../models/addressModel");
const jwt = require("jsonwebtoken");

// update cart
module.exports.postCart = async (req, res) => {
  try {
    if (req.cookies.user) {
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
      const data = await accountmodel.findOneAndUpdate(
        { _id: id },
        {
          Cart: product,
        }
      );
      if (data) {
        res.json({
          mess: "Cập nhật giỏ hàng thành công",
          status: 200,
          data: data,
        });
      }
    }
  } catch (error) {
    res.json(error);
  }
};

// create order

module.exports.postOrder = async (req, res, next) => {
    var address = req.body.address;
    var status = req.body.status;
  try {
    if (req.cookies.user != undefined) {
      const token = req.cookies.user;
      const id = jwt.verify(token, "Auth").id;
      const cart = await accountmodel.findOne({ _id: id });
      //   console.log(cart.Cart.length);
      if (cart.Cart.length > 0) {
        const data = await orderssModel.create({
          product: cart.Cart,
          userId: id,
          totalPrice: req.body.totalPrice,
          orderDate: Date.now().toString(),
          address: address,
          status: status,
        });
        if (data) {
          let prds = data.product;
          for (let i = 0; i < prds.length; i++) {
            let prd = await ProductModel.findOne({ _id: prds[i].productId });
            if (prd) {
              let total = prd.quantity - prds[i].quantity;
              let update = await ProductModel.findByIdAndUpdate(
                { _id: prd._id },
                { quantity: total }
              );
            }
          }
          res.json({
            mess: "Tạo đơn hàng thành công",
            status: 200,
            data: data,
          });
        }
      } else {
        res.json({ status: 400, mess: "Chưa có sản phẩm trong giỏ hàng" });
      }
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports.getCart = (req, res) => {
  const id = req.body.id;
  accountmodel
    .findOne({ _id: id })
    .populate("Cart.productId")
    .then((data) => {
      res.json({ data: data, mes: "ok", status: 200 });
    })
    .catch((err) => {
      res.json(err);
    });
};
