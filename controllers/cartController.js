const {cartModel} = require("../models/db_mongoose");
const jwt = require("jsonwebtoken");

// Tạo đơn hàng
module.exports.postCart = async (req, res) => {   
    const token = req.cookies.user
    const id = jwt.verify(token, "team").id;
    const keys = Object.keys(req.body)
    const productInfo = keys.filter((ele)=>{
        return ele.includes('prd')
    })
    let product = []
    for(let i = 0;i<productInfo.length;i+=2){
        product.push({
            productId:req.body[productInfo[i]],
            quantity:req.body[productInfo[i+1]]
        })
    }
    var status = req.body.status;
    try {
      const data = await cartModel.create({
        userId: id,
        product: product,
        status: status,
      });
      res.json({mess: "Tạo đơn hàng thành công", status: 200, data: data});
    } catch (error) {
      res.json(error);
    }
  };


