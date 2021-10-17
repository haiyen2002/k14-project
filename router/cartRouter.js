const router = require("express").Router();
const controller = require("../controllers/cartController");

router.post("/order", controller.postCart);

module.exports = router;
