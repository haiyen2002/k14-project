const {
  accountmodel,
  ProductModel,
  orderssModel,
} = require("../models/db_mongoose");
const bcrypt = require("bcrypt");
var path = require("path");

//
module.exports.adminlistUser = async (req, res) => {
  try {
    const userId = req.user._id;
    if (userId) {
      const acc = await accountmodel.findById(userId);
      const user = await accountmodel.find();
      const product = await ProductModel.find();
      const order = await orderssModel
        .find()
        .populate("userId")
        .populate("product.productId");
      res.render("Admin_pages/Admin_base", {
        content: "Customers",
        user: user,
        product: product,
        order: order,
        acc: acc,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports.adminlistProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    if (userId) {
      const acc = await accountmodel.findById(userId);
      const user = await accountmodel.find();
      const product = await ProductModel.find();
      const order = await orderssModel
        .find()
        .populate("userId")
        .populate("product.productId");
      res.render("Admin_pages/Admin_base", {
        content: "ListProduct",
        user: user,
        product: product,
        order: order,
        acc: acc,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports.adminHome = async (req, res) => {
  try {
    const userId = req.user._id;
    if (userId) {
      const acc = await accountmodel.findById(userId);
      const user = await accountmodel.find();
      const product = await ProductModel.find();
      const order = await orderssModel
        .find()
        .populate("userId")
        .populate("product.productId");
      res.render("Admin_pages/Admin_base", {
        content: "Dashboard",
        user: user,
        product: product,
        order: order,
        acc: acc,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports.adminlistOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    if (userId) {
      const acc = await accountmodel.findById(userId);
      const user = await accountmodel.find();
      const product = await ProductModel.find();
      const order = await orderssModel
        .find()
        .populate("userId")
        .populate("product.productId");
      res.render("Admin_pages/Admin_base", {
        content: "ListOrder",
        user: user,
        product: product,
        order: order,
        acc: acc,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports.adminaddProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    if (userId) {
      const acc = await accountmodel.findById(userId);
      const user = await accountmodel.find();
      const product = await ProductModel.find();
      const order = await orderssModel
        .find()
        .populate("userId")
        .populate("product.productId");
      res.render("Admin_pages/Admin_base", {
        content: "addProduct",
        user: user,
        product: product,
        order: order,
        acc: acc,
      });
    }
  } catch (error) {
    res.json(error);
  }
};



module.exports.adminchangePass = async (req, res) =>{
    try {
      const userId = req.user._id;
      if (userId) {
        const acc = await accountmodel.findById(userId);
        const user = await accountmodel.find();
        const product = await ProductModel.find();
        const order = await orderssModel
          .find()
          .populate("userId")
          .populate("product.productId");
        res.render("Admin_pages/Admin_base", {
          content: "changePass",
          user: user,
          product: product,
          order: order,
          acc: acc,
        });
      }
    } catch (error) {
      res.json(error);
    }
  };

module.exports.adminchangeProfile = async (req, res) =>{
    try {
      const userId = req.user._id;
      if (userId) {
        const acc = await accountmodel.findById(userId);
        const user = await accountmodel.find();
        const product = await ProductModel.find();
        const order = await orderssModel
          .find()
          .populate("userId")
          .populate("product.productId");
        res.render("Admin_pages/Admin_base", {
          content: "changeProfile",
          user: user,
          product: product,
          order: order,
          acc: acc,
        });
      }
    } catch (error) {
      res.json(error);
    }
  };



module.exports.getProduct = (req, res) => {
  const name = req.body.name;
  ProductModel.find({ name: { $regex: name, $options: "i" } })
    .then((data) => {
      res.json({ mess: "show data", data: data, status: 200 });
    })
    .catch((err) => {
      res.json({ mess: "loi sever", err: err, status: 500 });
    });
};

module.exports.pavigationProduct = async (req, res) => {
  try {
    const name = req.body.name;
    const data = await ProductModel.find({
      name: { $regex: name, $options: "i" },
    })
      .skip(parseInt((req.query.page - 1) * 6))
      .limit(6);
    if (data) {
      res.json({ status: 200, data: data, mess: "ok" });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports.getUser = (req, res) => {
  const username = req.body.username;
  accountmodel
    .find({
      username: { $regex: username, $options: "i" },
    })
    .then((data) => {
      res.json({ mess: "show data", data: data, status: 200 });
    })
    .catch((err) => {
      res.json({ mess: "loi sever", err: err, status: 500 });
    });
};

module.exports.pavigationUser = async (req, res) => {
  try {
    const username = req.body.username;
    const data = await accountmodel
      .find({
        username: { $regex: username, $options: "i" },
      })
      .skip(parseInt((req.query.page - 1) * 6))
      .limit(6);
    if (data) {
      res.json({ status: 200, data: data, mess: "ok" });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports.getOrder = (req, res) => {
  const idOrder = req.body.idOrder;
  orderssModel
    .find({
      address: { $regex: idOrder, $options: "i" },
    })
    .populate("userId")
    .populate("product.productId")
    .then((data) => {
      res.json({ mess: "show data", data: data, status: 200 });
    })
    .catch((err) => {
      res.json({ mess: "loi sever", err: err, status: 500 });
    });
};

module.exports.pavigationOrder = async (req, res) => {
  try {
    const idOrder = req.body.idOrder;
    const data = await orderssModel
      .find({
        address: { $regex: idOrder, $options: "i" },
      })
      .populate("userId")
      .populate("product.productId")
      .skip(parseInt((req.query.page - 1) * 6))
      .limit(6);
    if (data) {
      res.json({ status: 200, data: data, mess: "ok" });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports.postChangePass = async (req, res) => {
    try {
        req.body.newpass =  await bcrypt.hash(req.body.newpass, 10);
        const userId = req.user._id
        if(userId){
            const data = await accountmodel.findByIdAndUpdate(
                {_id: userId},
                {password: req.body.newpass}
                )
                if(data){
                    res.json({status: 200, mess: "change pass compelete", data: data})
                }
        }else{
            res.json({status: 400, mess: "Ban chua dang nhap"})
        }
    } catch (error) {
        res.json({status: 500, mess: "lỗi sever", error: error})
    }
}
