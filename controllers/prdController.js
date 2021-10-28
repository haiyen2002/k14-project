const { ProductModel, accountmodel } = require("../models/db_mongoose");

module.exports.findPrd = async (req, res)=>{
    try {
        const id = req.body.id
        const data = await ProductModel.findOne({_id: id})
        res.json(data)
        
    } catch (error) {
        res.json(error)
    }
}

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
