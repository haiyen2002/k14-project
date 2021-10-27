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
    birthday: String,
    avatar: {
      type: String,
      default: "https://hook.finance/sites/default/files/user.png",
    },
    createdAt: Date,
    role: { type: String, default: "user" },
    Cart: [
      {
        productId: {
          type: String,
          ref: "Products",
        },
        quantity: Number,
      },
    ],
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

// const Cart = new Schema(
//   {
//     product: [
//       {
//         productId: {
//           type: String,
//           ref: "Products",
//         },
//         quantity: Number,
//       },
//     ],
//     userId: {
//       type: String,
//       ref: "account",
//     },
//     status: {
//       type: String,
//       default: "Wait for Pay!"
//     }
//   },
//   { collection: "Cart" }
// );

const orders = new Schema(
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
      default: "Pending...",
    },
    orderDate: Date,
    totalPrice: String,
  },
  { collection: "orders" }
);

const BlackListSchema = mongoose.Schema(
  {
    token: String,
  },
  { collection: "blackList" }
);

const BlackListModel = mongoose.model("blackList", BlackListSchema);
const ProductModel = mongoose.model("Products", Products);
const accountmodel = mongoose.model("account", account);
// const cartModel = mongoose.model("Cart", Cart);
const orderssModel = mongoose.model("orders", orders);

module.exports = { ProductModel, accountmodel, orderssModel, BlackListModel };
