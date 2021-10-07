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

// Trang chủ*******//
router.get("/", async (req, res) => {
  try {
    const prdAll = await ProductModel.find();
    const prdHair = await ProductModel.find({ prd_key: "123" });
    const prdST = await ProductModel.find({ prd_key: "456" });
    res.render("pages/home", {
      prdAll,
      prdHair,
      prdST,
    });
  } catch (error) {
    res.json(error);
  }
});

// Trang Về chúng tôi*******//
router.get("/ve-chung-toi/", (req, res) => {
  res.render("pages/home_Vechungtoi");
});

// Trang Tầm nhìn- sứ mệnh - giá trị cốt lõi *******//
router.get("/tam-nhin-su-menh-gia-tri-cot-loi/", (req, res) => {
  res.render("pages/home_Tamnhin");
});

// Trang Liên hệ*******//
router.get("/lien-he", (req, res) => {
  res.render("pages/home_Lienhe");
});

// Trang Hệ thống phân phối*******//
router.get("/he-thong-phan-phoi-va-ban-le/", (req, res) => {
  res.render("pages/home_HethongPhanphoi");
});

// Trang đăng ký*******//
router.get("/regiser", (req, res) => {
  res.render("pages/regiser");
});

// Trang Admin*******//
router.get("/admin", (req, res) => {
  res.render("pages/admin");
});

// Trang Adm thêm sp*******//
router.get("/add", (req, res) => {
  res.render("pages/add");
});

// Trang Adm quản lý sp*******//
router.get("/products", (req, res) => {
  res.render("pages/adminProducts");
});

// Trang Adm quản lý user*******//
router.get("/user", async (req, res) => {
  try {
    const acc = await accountmodel.find({ role: "user" });
    res.render("pages/adminListUser", {
      acc,
    });
  } catch (error) {
    res.json(error);
  }
});

// Trang Adm quản lý oder*******//
router.get("/oder", (req, res) => {
  res.render("pages/adminOders");
});

// post add****/
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
module.exports = router;
