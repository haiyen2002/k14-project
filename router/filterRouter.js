const express = require('express');
const router = express.Router();
var path = require("path");
var productController = require('../controllers/ProductsController');
router.get('/', (req, res) => {
     productController.getAllProduct()
          .then(products => {
               productController.getTypePrd()
                    .then(types => {
                         res.render('filter/filter', {
                              products: products,
                              types: types,
                         });
                    })
          })
          .catch(err => console.log(err))
})

router.post('/',async (req, res)=>{
     const type= req.body.type;
     const types = await productController.getTypePrd()
     productController.findPrdByType(type)
     .then(products => {
          res.status(200).json({
               products: products,
               types: types
          });
     })
     .catch(err => console.log(err))
})


module.exports = router