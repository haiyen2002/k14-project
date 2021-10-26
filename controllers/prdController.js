const { ProductModel, accountmodel } = require("../models/db_mongoose");


// module.exports.getOrder = async (req, res) => {
    
//   try {
//     const token = req.cookies.user;
//     const id = jwt.verify(token, "Auth").id
//     const acc = await accountmodel.findById({_id: id})
//     console.log(acc);
//     const types = await ProductModel.distinct("prd_key");
//     res.render("Order-Cart/order", {
//       types: types,
//       acc : acc,
//     });
//   } catch (error) {
//     res.json(error);
//   }
// };

// module.exports.getCart = async (req, res) => {
//   try {
//     const types = await ProductModel.distinct("prd_key");
//     res.render("Order-Cart/cart", {
//       types: types,
//     });
//   } catch (error) {
//     res.json(error);
//   }
// };

module.exports.prdDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const types = await ProductModel.distinct("prd_key");
    const prd_key = await ProductModel.distinct("prd_key");
    console.log(prd_key);
    const prd_detail = await ProductModel.findOne({ _id: id });
    res.render("Products/product_Detail", {
      prd_detail,
      prd_key,
      types,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports.about_Us = async (req, res) => {
  try {
    const types = await ProductModel.distinct("prd_key");
    res.render("home/about_us", {
      types: types,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports.slogan = async (req, res) => {
  try {
    const types = await ProductModel.distinct("prd_key");
    res.render("home/slogan", {
      types: types,
    });
  } catch (error) {
    res.json(error);
  }
};
module.exports.contact = async (req, res) => {
  try {
    const types = await ProductModel.distinct("prd_key");
    res.render("home/contact", {
      types: types,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports.store = async (req, res) => {
  try {
    const types = await ProductModel.distinct("prd_key");
    res.render("home/store", {
      types: types,
    });
  } catch (error) {
    res.json(error);
  }
};
