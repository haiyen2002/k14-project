const router = require("express").Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const model = require("../models/db_mongoose");
const addressUser = require("../models/addressModel");
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
  const Showproduct = await model.ProductModel.find().limit(9);
  if (Showproduct) {
    return res.render("admin/listProducts", {
      Showproduct,
    });
  }
});

router.get("/getPrd", async (req, res) => {
  const resultPrd = await model.ProductModel.find();
  if (resultPrd) {
    return res.json(resultPrd.length);
  }
});
router.get("/listProducts/pagination/", async (req, res) => {
  let perPage = 9;
  let page = req.query.page;
  const Showproduct = await model.ProductModel.find()
    .skip(perPage * page - perPage)
    .limit(perPage);
  if (Showproduct) {
    return res.render("components/viewProducts", {
      Showproduct,
    });
  }
});

router.get(
  "/listProducts/:key",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    if (req.params.key == "Tất cả") {
      req.params.key = "";
    }
    const Showproduct = await model.ProductModel.find({
      prd_key: { $regex: req.params.key },
    });
    if (Showproduct) {
      return res.render("components/viewProducts", {
        Showproduct,
      });
    }
  }
);

router.get(
  "/searchprd/:key",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    const Showproduct = await model.ProductModel.find({
      name: { $regex: req.params.key },
    });
    if (Showproduct.length == 0) {
      return res.render("components/viewProducts", { Showproduct });
    }
    if (Showproduct.length != 0) {
      return res.render("components/viewProducts", {
        Showproduct,
      });
    }
  }
);
router.get(
  "/searchprd",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    const Showproduct = await model.ProductModel.find({});
    if (Showproduct) {
      return res.render("components/viewProducts", {
        Showproduct,
      });
    }
  }
);

router.get("/addProducts", async (req, res) => {
  return res.render("admin/addProducts");
});

router.get("/listOrders", async (req, res) => {
  const showorders = await model.orderssModel.find();
  const prd = await model.ProductModel.find();
  const address = await addressUser.find();
  if (showorders) {
    return res.render("admin/orders", {
      showorders,
      prd,
      address,
    });
  }
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
    codeProduct: req.body.codeProduct,
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

router.post(
  "/updateimageprd",
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

router.put(
  "/updateProduct/:id",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    try {
      const prdID = req.params.id;
      if (req.body["img[]"]) {
        const result = await model.ProductModel.findByIdAndUpdate(
          { _id: prdID },
          {
            name: req.body.name,
            img: req.body["img[]"],
            codeProduct: req.body.codeProduct,
            price: req.body.price,
            quantity: req.body.quantity,
            prd_key: req.body.prd_key,
            descriptionDetails: req.body.descriptionDetails,
            rate: req.body.rate,
          }
        );
        if (result) {
          return res.json({ status: 200, mess: "finish", result });
        }
      } else {
        const result = await model.ProductModel.findByIdAndUpdate(
          { _id: prdID },
          {
            name: req.body.name,
            codeProduct: req.body.codeProduct,
            price: req.body.price,
            quantity: req.body.quantity,
            prd_key: req.body.prd_key,
            descriptionDetails: req.body.descriptionDetails,
            rate: req.body.rate,
          }
        );
        if (result) {
          return res.json({ status: 200, mess: "finish", result });
        }
      }
    } catch (error) {
      res.json({ status: 500, mess: "Error server", error });
    }
  }
);

router.delete(
  "/deletePrd/:id",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    try {
      const PRDID = req.params.id;
      const result = await model.ProductModel.deleteOne({ _id: PRDID });
      console.log(result);
      if (result.deletedCount !== 0) {
        res.json({ status: 200, mess: "delete finish", result });
      } else {
        res.json({ status: 400, mess: "not find data" });
      }
    } catch (err) {
      res.json({ status: 500, mess: "error server" });
    }
  }
);

module.exports = router;
