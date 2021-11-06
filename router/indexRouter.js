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

router.post("/allproduct", (req, res) => {
  const products = productController
    .getAllProduct()
    .then((products) => {
      res.status(200).json({
        products,
        message: "success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: false,
        message: "Loi server",
      });
    });
});

router.get("/cart", (req, res) => {
  productController
    .getAllProduct()
    .then((products) => {
      productController.getTypePrd().then((types) => {
        res.render("pages/Base_pages", {
            content: 'cart',
          products: products,
          types: types,
        });
      });
    })
    .catch((err) => console.log(err));
});

router.get("/myOrder", async (req, res) => {
  try {
    if (req.cookies.user != undefined) {
      const token = req.cookies.user;
      const id = jwt.verify(token, "Auth").id;
      const products = await productController.getAllProduct();
      const types = await productController.getTypePrd();
      const acc = await accountmodel.findOne({ _id: id });
      const myorder = await orderssModel
        .find({ userId: id })
        .populate("product.productId");
        if(myorder){
            res.render("pages/Base_pages", {
           content: 'myOrder',
           products: products,
           types: types,
           acc: acc,
           myorder: myorder,
         });
        }else if(!myorder){
            res.render("pages/Base_pages", {
                content: 'myOrder',
                products: products,
                types: types,
                acc: acc,
             
              });
        }
      
    }
  } catch (error) {
    res.json(error);
  }
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
      res.render("pages/Base_pages", {
        content: 'order',
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
    res.json(error);
  }
});

router.get("/profile", async (req, res)=>{
    try {
        const userId = req.user._id;
        if(userId){
            const acc = await accountmodel.findById(userId);
            const products = await productController.getAllProduct();
            const types = await productController.getTypePrd();
            res.render("pages/Base_pages", {
                content: 'profile',
                products: products,
                types: types,
                acc: acc,        
              });
        }
        
    } catch (error) {
        res.json(error);
    }
})

router.get("/about-us/", controller.about_Us);

router.get("/slogan/", controller.slogan);

router.get("/contact", controller.contact);

router.get("/store/", controller.store);

router.get("/show", (req, res) => {
  orderssModel
    // .deleteMany()
    .deleteMany()

    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});



module.exports = router;
