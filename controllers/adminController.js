const {
    accountmodel,
    ProductModel,
    orderssModel,
  } = require("../models/db_mongoose");
  
  var path = require("path");
  
  //
  module.exports.adminlistUser = async (req, res) => {
    try {
      const user = await accountmodel.find();
      const product = await ProductModel.find();
      const order = await orderssModel.find();
      res.render("Admin_pages/Admin_base", {
        content: "Customers",
        user: user,
        product: product,
        order: order,
      });
    } catch (error) {
      res.json(error);
    }
  };
  
  module.exports.adminlistProduct = async (req, res) => {
    try {
      const user = await accountmodel.find();
      const product = await ProductModel.find();
      const order = await orderssModel.find();
      res.render("Admin_pages/Admin_base", {
        content: "ListProduct",
        user: user,
        product: product,
        order: order,
      });
    } catch (error) {
      res.json(error);
    }
  };
  
  module.exports.adminHome = async (req, res) => {
    try {
      const user = await accountmodel.find();
      const product = await ProductModel.find();
      const order = await orderssModel.find();
      res.render("Admin_pages/Admin_base", {
        content: "Dashboard",
        user: user,
        product: product,
        order: order,
      });
    } catch (error) {
      res.json(error);
    }
  };
  
  module.exports.adminlistOrder = async (req, res) => {
    try {
      const user = await accountmodel.find();
      const product = await ProductModel.find();
      const order = await orderssModel.find();
      res.render("Admin_pages/Admin_base", {
        content: "ListOrder",
        user: user,
        product: product,
        order: order,
      });
    } catch (error) {
      res.json(error);
    }
  };
  
  module.exports.adminaddProduct = async (req, res) => {
    try {
      const user = await accountmodel.find();
      const product = await ProductModel.find();
      const order = await orderssModel.find();
      res.render("Admin_pages/Admin_base", {
        content: "addProduct",
        user: user,
        product: product,
        order: order,
      });
    } catch (error) {
      res.json(error);
    }
  };
  
  module.exports.adminchangePass = async (req, res) => {
    try {
      const user = await accountmodel.find();
      const product = await ProductModel.find();
      const order = await orderssModel.find();
      res.render("Admin_pages/Admin_base", {
        content: "changePass",
        user: user,
        product: product,
        order: order,
      });
    } catch (error) {
      res.json(error);
    }
  };
  
  module.exports.adminchangeProfile = async (req, res) => {
    try {
      const user = await accountmodel.find();
      const product = await ProductModel.find();
      const order = await orderssModel.find();
      res.render("Admin_pages/Admin_base", {
        content: "changeProfile",
        user: user,
        product: product,
        order: order,
      });
    } catch (error) {
      res.json(error);
    }
  };
  