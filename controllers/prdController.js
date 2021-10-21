const {ProductModel} = require("../models/db_mongoose");
      
module.exports.getOrder = async (req, res) => {
    try {
        const types = await ProductModel.distinct('prd_key')
        res.render("Order-Cart/order", {
            types: types
        });
        
    } catch (error) {
        res.json(error)
    }
}

module.exports.getCart = async (req, res) => {
    try {
        const types = await ProductModel.distinct('prd_key')
        res.render("Order-Cart/cart", {
            types: types
        });
        
    } catch (error) {
        res.json(error)
    }
}

module.exports.prdDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const types = await ProductModel.distinct('prd_key')
      const prdHair = await ProductModel.find({prd_key: "123"});
      const prdST = await ProductModel.find({prd_key: "456"});
      const data = await ProductModel.findOne({_id: id});
      res.render("Products/product_Detail", {
        data,
        prdST,
        prdHair,
        types
      });
    } catch (error) {
      res.json(error);
    }
};

