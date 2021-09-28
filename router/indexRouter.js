const express = require('express');
const router = express.Router();
var path = require("path");

router.get('/', (req, res) => {
    res.render('home/index');
})

module.exports = router