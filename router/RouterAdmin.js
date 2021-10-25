const router = require("express").Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const model = require("../models/db_mongoose");
const bcrypt = require("bcrypt");
const check = require("../controllers/checkAuth");
require("dotenv").config({ path: "../.env" });

const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

router.get("/listuser", async (req, res) => {
  const showUser = await model.accountmodel.find();
  if (showUser) {
    return res.render("admin/listuseradmin", {
      showUser,
    });
  }
});

router.get("/listProducts", async (req, res) => {
  const Showproduct = await model.ProductModel.find();
  if (Showproduct) {
    return res.render("admin/listProducts", {
      Showproduct,
    });
  }
});

router.get("/addProducts", async (req, res) => {
  return res.render("admin/addProducts");
});

router.post(
  "/update",
  upload.array("image", 10),
  async function (req, res, next) {
    try {
      const arr = [];
      for (let i = 0; i < req.files.length; i++) {
        let index = req.files[i].path.split("public");
        let link = "/public" + index[1];
        arr.push(link.split("\\").join("/"));
      }
      res.json({ status: 200, mess: "success", arr });
    } catch (error) {
      res.json({ status: 500, mess: "loi server", error });
    }
  }
);
router.post("/updatenew", async (req, res) => {
  const dataressult = await model.ProductModel.create({
    name: req.body.name,
    img: req.body["img[]"],
    codeProduct: req.body.codeprd,
    price: req.body.price,
    quantity: req.body.quantity,
    prd_key: req.body.prd_key,
    descriptionDetails: req.body.descriptionDetails,
    rate: req.body.rate,
  });
  if (dataressult) {
    res.json({ status: 200, mess: "ok", dataressult });
  } else {
    res.json({ status: 400, mess: "ok", dataressult });
  }
});

// router.post("/getdata", async (req, res) => {
//   const checkdata = await model.ProductModel.findOne({
//     _id: req.body._id,
//   });
//   if (checkdata) {
//     res.json({ status: 200, mess: "Ok", checkdata });
//   }
// });

router.delete("/:id", check.checkLogin, check.checkAdmin, async (req, res) => {
  try {
    const userID = req.params.id;
    const result = await model.accountmodel.deleteOne({ _id: userID });
    console.log(result);
    if (result.deletedCount !== 0) {
      res.json({ status: 200, mess: "delete finish", result });
    } else {
      res.json({ status: 400, mess: "not find data" });
    }
  } catch (err) {
    res.json({ status: 500, mess: "error server" });
  }
});

router.put(
  "/updateUser/:id",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    try {
      const userID = req.params.id;
      const result = await model.accountmodel.findByIdAndUpdate(
        { _id: userID },
        {
          role: req.body.role,
        }
      );
      if (result) {
        res.json({ status: 200, mess: "finish", result });
      }
    } catch (error) {}
  }
);

module.exports = router;
