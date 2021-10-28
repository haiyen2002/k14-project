const router = require("express").Router();
var path = require("path");
const controller = require("../controllers/prdController");

router.post("/find", controller.findPrd)

router.get("/detail/:id", controller.prdDetail);

module.exports = router;
