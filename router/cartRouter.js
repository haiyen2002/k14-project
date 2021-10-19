const router = require("express").Router();
const path = require("path");
const controller = require("../controllers/cartController");

// tạo đơn hàng

router.post("/order", controller.postCart);

router.get("/deleteCart", (req, res)=>{
    res.sendFile(path.join(__dirname, "../views/delete.html"))
})
module.exports = router;
