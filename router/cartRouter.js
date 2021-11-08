const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { route } = require("./UserRouter");
const {orderssModel} = require("../models/db_mongoose")

//get Cart Page
router.get('/',cartController.getCart)


// update Cart

// router.put("/cart/", cartController.postCart);

//create order

router.post("/order/", cartController.postOrder);

//
router.get("/check", cartController.getUpCart);

//

router.delete("/cancel/:id", cartController.cancelOrder ) 

//add cart to database
router.put('/add', cartController.addCart) 

module.exports = router;
