const express = require("express");
const router = express.Router();
var path = require("path");
const { ProductModel } = require("../models/db_mongoose");

// PRODUCT ALL //

router.get("/", async (req, res) => {
  try {
    const data = await ProductModel.find();
    const prdST = await ProductModel.find({ prd_key: "456" });
    res.render("Prd/prd-All", {
      data,
      prdST,
    });
  } catch (error) {}
});
// PRODUCT - CHAM SOC TOC //

router.get("/cham-soc-toc", async (req, res) => {
  try {
    const data = await ProductModel.find({ prd_key: "123" });
    const prdST = await ProductModel.find({ prd_key: "456" });
    res.render("Prd/prd-Hair", {
      data,
      prdST,
    });
  } catch (error) {}
});
// PRODUCT CHAM SOC DA //

router.get("/cham-soc-da", async (req, res) => {
  try {
    const data = await ProductModel.find({ prd_key: "456" });
    const prdST = await ProductModel.find({ prd_key: "456" });
    res.render("Prd/prd-Skincare", {
      data,
      prdST,
    });
  } catch (error) {}
});
// PRODUCT DAU GOI //

router.get("/dau-goi", async (req, res) => {
  try {
    const data = await ProductModel.find({ codeProduct: "DG" });
    const prdST = await ProductModel.find({ prd_key: "456" });
    res.render("Prd/prd-DG", {
      data,
      prdST,
    });
  } catch (error) {}
});
// PRODUCT DAU XA //

router.get("/sua-tam", async (req, res) => {
  try {
    const data = await ProductModel.find({ codeProduct: "DX" });
    const prdST = await ProductModel.find({ prd_key: "456" });
    res.render("Prd/prd-ST", {
      data,
      prdST,
    });
  } catch (error) {}
});
// PRODUCT SUA TAM //

router.get("/dau-xa", async (req, res) => {
  try {
    const data = await ProductModel.find({ codeProduct: "ST" });
    const prdST = await ProductModel.find({ prd_key: "456" });
    res.render("Prd/prd-ST", {
      data,
      prdST,
    });
  } catch (error) {}
});

// PRODUCT DETAIL //

router.get("/detail/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const prdHair = await ProductModel.find({ prd_key: "123" });
    const prdST = await ProductModel.find({ prd_key: "456" });
    const data = await ProductModel.findOne({ _id: id });
    res.render("Prd/product-detail", {
      data,
      prdST,
      prdHair,
    });
  } catch (error) {}
});

module.exports = router;
