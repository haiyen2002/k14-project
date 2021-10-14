const mongoose = require("./dbconnect");
const Schema = mongoose.Schema;

const SelectedProduct = new Schema(
  {
    userId: String,
    productId: {
      type: String,
      ref: "Products",
    },
    quantity: Number,
  },
  {
    collection: "selectedProduct",
  }
);

const SelectedProductModel = mongoose.model("selectedProduct", SelectedProduct);
module.exports = SelectedProductModel;
