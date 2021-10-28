const router = require("express").Router();
const path = require("path");
const controller = require("../controllers/cartController");
const { route } = require("./UserRouter");

// update Cart

router.put("/cart/", controller.postCart);

//create order

router.post("/order/", controller.postOrder);

//
router.post("/check", controller.getCart);

module.exports = router;
