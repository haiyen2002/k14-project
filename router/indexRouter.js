const router = require("express").Router();
var path = require("path");
const jwt = require("jsonwebtoken");
var productController = require("../controllers/ProductsController");
const controller = require("../controllers/prdController");
const {
  cartModel,
  BlackListModel,
  ProductModel,
  accountmodel,
  orderssModel,
} = require("../models/db_mongoose");
const UserAddressModel = require("../models/addressModel");

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

router.get("/cart", (req, res) => {
  productController
    .getAllProduct()
    .then((products) => {
      productController.getTypePrd().then((types) => {
        res.render("Order-Cart/cart", {
          products: products,
          types: types,
        });
      });
    })
    .catch((err) => console.log(err));
});

router.get("/order", async (req, res) => {
  try {
    // console.log(63, req.cookies.user);
    if (req.cookies.user != undefined) {
      const token = req.cookies.user;
      const id = jwt.verify(token, "Auth").id;
      const products = await productController.getAllProduct();
      const types = await productController.getTypePrd();
      const acc = await accountmodel.findOne({ _id: id });
      res.render("Order-Cart/order", {
        products: products,
        types: types,
        acc: acc,
      });
    } else {
      const products = await productController.getAllProduct();
      const types = await productController.getTypePrd();
      const acc = {};
      res.render("Order-Cart/order", {
        products: products,
        types: types,
        acc: acc,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/about-us/", controller.about_Us);

router.get("/slogan/", controller.slogan);

router.get("/contact", controller.contact);

router.get("/store/", controller.store);

router.get("/show", (req, res) => {
  orderssModel
    // .deleteMany()
    .find()

    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res, json(err);
    });
});
router.get("/toadmin", (req, res) => {
  accountmodel
    // .deleteMany()
    .findByIdAndUpdate({ _id: "617a76006a67f918da8b57fe" }, { role: "admin" })

    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res, json(err);
    });
});

module.exports = router;
