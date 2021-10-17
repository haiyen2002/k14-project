const router = require("express").Router();
const controller = require("../controllers/cartController");

// tạo đơn hàng
router.post("/order", controller.postCart);

module.exports = router;
