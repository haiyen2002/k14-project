const mongoose = require("./dbconnect");
// const useraddress = require("../models/addressModel");
// const selectedProduct = require("../models/selectedProduct");
const Schema = mongoose.Schema;

const account = new Schema(
  {
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    phone: String,
    gender: String,
    email: String,
    birthday: Date,
    avatar: {
      type: String,
      default:
        "https://cdn1.vectorstock.com/i/1000x1000/11/10/admin-icon-male-person-profile-avatar-with-gear-vector-25811110.jpg",
    },
    createdAt: Date,
    role: { type: String, default: "user" },
  },
  { collection: "account" }
);

const Products = new Schema(
  {
    name: String,
    img: [
      {
        type: String,
      },
    ],
    codeProduct: String,
    price: String,
    quantity: String,
    prd_key: String,
    descriptionDetails: String,
    rate: String,
    
  },
  {
    collection: "Products",
  }
);

const Cart = new Schema(
  {
    product: [
      {
        productId: {
          type: String,
          ref: "Products",
        },
        quantity: Number,
      },
    ],
    userId: {
      type: String,
      ref: "account",
    },
    status: {
      type: String,
      default: "Wait for Pay!"
    }
  },
  { collection: "Cart" }
);

const orders = new Schema(
  {
    product: [{ type: String, ref: "selectedProduct" }],
    address: {
      type: String,
      ref: "useraddress",
    },
    userId: {
      type: String,
      ref: "account",
    },
    status: {
      type: String,
      default: "shipping...",
    },
    orderDate: Date,
    totalPrice: Number,
  },
  { collection: "orders" }
);
const ProductModel = mongoose.model("Products", Products);
const accountmodel = mongoose.model("account", account);
const cartModel = mongoose.model("Cart", Cart);
const orderssModel = mongoose.model("orders", orders);


module.exports = { ProductModel, accountmodel, cartModel, orderssModel };
