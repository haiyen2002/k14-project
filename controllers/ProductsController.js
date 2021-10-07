const model = require('../models/db_mongoose');
const ProductModel = model.ProductModel;

function getAllProduct() {
    return ProductModel.find()
}

function getTypePrd(){
    return ProductModel.distinct('prd_key')
}

function getSampoo(){
    
}
module.exports = {
    getAllProduct,
    getTypePrd
}