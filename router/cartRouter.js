const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { route } = require("./UserRouter");

// update Cart

router.put("/cart/", cartController.postCart);

//create order

router.post("/order/", cartController.postOrder);

//
router.post("/check", cartController.getCart);

module.exports = router;
