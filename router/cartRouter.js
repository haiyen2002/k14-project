const router = require("express").Router();
const path = require("path");
const controller = require("../controllers/cartController");

// update Cart

router.put("/cart/", controller.postCart);

//create order

router.post("/order/", controller.postOrder);

module.exports = router;
