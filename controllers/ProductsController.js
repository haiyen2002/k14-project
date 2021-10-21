const model = require('../models/db_mongoose');
const ProductModel = model.ProductModel;

function getAllProduct() {
    return ProductModel.find()
}

function getTypePrd(){
    return ProductModel.distinct('prd_key')
}

function findPrdByUserData(type, name){
    return ProductModel.find( { prd_key: { $regex: type, $options: 'i'}, name : {$regex: name, $options: 'i'}})
 }

function findPrdByType(type){
    return ProductModel.find( { prd_key: { $regex: type, $options: 'i'}})
}
module.exports = {
    getAllProduct,
    getTypePrd,
    findPrdByUserData,
    findPrdByType
}