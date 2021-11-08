const router = require("express").Router();
const prdController = require("../controllers/prdController");

router.post("/find", prdController.findPrd)

router.get("/detail/:id", prdController.prdDetail);

module.exports = router;
