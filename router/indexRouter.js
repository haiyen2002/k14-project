const express = require("express");
const router = express.Router();
var path = require("path");
var productController = require("../controllers/ProductsController");
const {ProductModel, accountmodel} = require("../models/db_mongoose");
router.get("/", (req, res) => {
  productController
    .getAllProduct()
    .then((products) => {
      productController.getTypePrd().then((types) => {
        res.render("home/index", {
          products: products,
          types: types,
        });
      });
    })
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  var name = req.body.name;
  var type = req.body.type;
  if (type == "All") {
    type = "";
  }
  productController
    .findPrdByUserData(type, name)
    .then((data) => {
      res.json({
        err: false,
        message: "hien thi du lieu thanh cong",
        data: data,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/count", (req, res) => {});

// SEARCH //
router.post("/search", (req, res) => {
  const name = req.body.name;
  ProductModel.find({name: {$regex: name, $options: "i"}})
    .then((data) => {
      res.json({
        data: data,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

// CART //

router.get("/cart/", (req, res) => {
  res.render("Order-Cart/cart");
});

// ORDER //
router.get("/order/", (req, res) => {
  res.render("Order-Cart/order");
});

router.get("/ttt", (req, res) => {
  ProductModel.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/aaa", (req, res) => {
  accountmodel
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
