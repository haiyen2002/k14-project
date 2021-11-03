const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { route } = require("./UserRouter");

// update Cart

router.put("/cart/", cartController.postCart);

//create order

router.post("/order/", cartController.postOrder);

//
router.get("/check", cartController.getUpCart);

module.exports = router;
