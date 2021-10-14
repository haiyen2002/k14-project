const express = require("express");
const router = express.Router();
var path = require("path");
const { accountmodel } = require("../models/db_mongoose");
const multer = require("multer");
const { ProductModel } = require("../models/db_mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/upload"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(file);
    if (
      file.mimetype == "image/bmp" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Only image are allowed!"));
    }
  },
}).single("imgProducts");

// HOME //
router.get("/", async (req, res) => {
  try {
    const prdAll = await ProductModel.find();
    const prdDG = await ProductModel.find({ codeProduct: "DG" });
    const prdDX = await ProductModel.find({ codeProduct: "DX" });
    const prdHair = await ProductModel.find({ prd_key: "123" });
    const prdST = await ProductModel.find({ prd_key: "456" });
    res.render("Home/home", {
      prdAll,
      prdHair,
      prdST,
      prdDG,
      prdDX,
    });
  } catch (error) {
    res.json(error);
  }
});

// ABOUT US //
router.get("/about-us/", (req, res) => {
  res.render("store-detail/about-us");
});

// SLOGAN  //
router.get("/slogan/", (req, res) => {
  res.render("store-detail/slogan");
});

// CONTACT //
router.get("/contact", (req, res) => {
  res.render("store-detail/contact");
});

// STORE //
router.get("/store/", (req, res) => {
  res.render("store-detail/store");
});

// REGISER //
router.get("/regiser", (req, res) => {
  res.render("Home/regiser");
});

//CART //
router.get("/cart/", (req, res) => {
  res.render("Order-Cart/cart");
});

// ORDER //
router.get("/order/", (req, res) => {
  res.render("Order-Cart/order");
});

//------------------------------------//

// ADMIN //
router.get("/admin", (req, res) => {
  res.render("page_admin/admin");
});

// ADMIN - ADD //
router.get("/add", (req, res) => {
  res.render("page_admin/add");
});

// ADMIN - PRODUCTS //
router.get("/products", async (req, res) => {
  try {
    const prd = await ProductModel.find();
    res.render("page_admin/Products", {
      prd,
    });
  } catch (error) {
    res.json;
  }
});

// ADMIN - USER //
router.get("/user", async (req, res) => {
  try {
    const acc = await accountmodel.find({ role: "user" });
    res.render("page_admin/ListUser", {
      acc,
    });
  } catch (error) {
    res.json(error);
  }
});

// ADMIN - ODER //
router.get("/oder", (req, res) => {
  res.render("page_admin/Oders");
});

// POST - ADD /
router.post("/add", function (req, res) {
  //Upload file
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.json({ kq: 0, errMsg: "A Multer error occurred when uploading." });
    } else if (err) {
      res.json({
        kq: 0,
        errMsg: " An unknown error occurred when uploading." + err,
      });
    } else {
      //Save Mongo (req.file.filename)
      console.log(req.file.filename);
      var prd = ProductModel({
        name: req.body.txtName,
        img: req.file.filename,
        codeProduct: req.body.codePrd,
        price: req.body.pricePrd,
        quantity: req.body.quanlity,
        prd_key: req.body.prdKey,
        descriptionDetails: req.body.prdDes,
      });
      prd.save(function (err) {
        if (err) {
          res.json({
            kq: 0,
            errMsg: err,
          });
        } else {
          res.json({ kq: 1 });
        }
      });
    }
  });
});

// PRODUCT //

module.exports = router;
