const router = require("express").Router();
const controller = require('../controllers/accountController')

router.post("/dangky", controller.regiser);

router.post("/dangnhap", controller.login);

router.post("/checkLogin",controller.checkLogin);

router.post("/logout",controller.logout);

module.exports = router;