const {ProductModel} = require("../models/db_mongoose");

module.exports.postSearch = (req, res) => {
  let name = req.body.name;
  let select = req.body.select;
  if ((select = "All")) {
    select = "";
  }
  ProductModel.find({
    prd_key: {$regex: select, $options: "i"},
    name: {$regex: name, $options: "i"},
  })
    .then((data) => {
      res.json({
        data: data,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getOrder = (req, res) => {
  res.render("Order-Cart/order");
};
module.exports.getCart = (req, res) => {
  res.render("Order-Cart/cart");
};
