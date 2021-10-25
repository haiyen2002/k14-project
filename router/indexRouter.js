const router = require("express").Router();
var path = require("path");
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

router.get("/order", (req, res) => {
  productController
    .getAllProduct()
    .then((products) => {
      productController.getTypePrd().then((types) => {
        res.render("Order-Cart/order", {
          products: products,
          types: types,
        });
      });
    })
    .catch((err) => console.log(err));
});

router.get("/about-us/", controller.about_Us);

router.get("/slogan/", controller.slogan);

router.get("/contact", controller.contact);

router.get("/store/", controller.store);

router.get("/show", (req, res) => {
  var date = new Date().toDateString();
  console.log(date);
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
router.get("/show", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/showdata.html"));
});
module.exports = router;
