const express = require('express');
const router = express.Router();
var path = require("path");
var productController = require('../controllers/ProductsController');
router.get('/', (req, res) => {
     productController.getAllProduct()
     .then(products => {
          productController.getTypePrd()
          .then( types => {
               res.render('home/index', {
                    products: products,
                    types: types,
               });
          })
          
     })
     .catch(err => console.log(err))

     
})

router.get('/count', (req, res )=> {
    
})

module.exports = router