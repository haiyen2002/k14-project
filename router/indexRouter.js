const router = require("express").Router();
var path = require("path");
const controller = require("../controllers/prdController");
var productController = require("../controllers/ProductsController");
const {
  cartModel, BlackListModel, ProductModel, accountmodel,
} = require("../models/db_mongoose");

router.get("/regiser", (req, res)=>{
    res.sendFile(path.join(__dirname, "../views/regiser.html"))
})

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

router.post("/search", controller.postSearch);

router.get("/cart/", controller.getCart);

router.get("/order/", controller.getOrder);

router.get("/testData", (req, res) => {
  cartModel.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
