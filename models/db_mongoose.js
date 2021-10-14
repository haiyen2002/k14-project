const mongoose = require("./dbconnect");
// const useraddress = require("../models/addressModel");
// const selectedProduct = require("../models/selectedProduct");
const Schema = mongoose.Schema;

const account = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
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
      default: "Wait for Pay!",
    },
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

const BlackListSchema = mongoose.Schema(
  {
    token: String,
  },
  { collection: "blackList" }
);

const ProductModel = mongoose.model("Products", Products);
const accountmodel = mongoose.model("account", account);
const cartModel = mongoose.model("Cart", Cart);
const orderssModel = mongoose.model("orders", orders);

const BlackListModel = mongoose.model("blackList", BlackListSchema);

module.exports = {
  ProductModel,
  accountmodel,
  cartModel,
  orderssModel,
  BlackListModel,
};
// cartModel.create({
//   product: [
//     { productId: "615d18a327001b385a065018", quantity: 6 },
//     { productId: "615d192f28ace14fd409c0da", quantity: 5 },
//   ],
// });
// cartModel
//   .findOne()
//   .populate("product.productId")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
