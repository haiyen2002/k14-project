const {cartModel} = require("../models/db_mongoose");
const jwt = require("jsonwebtoken");

// tạo đơn hàng
module.exports.postCart = async (req, res) => {
    console.log(req.body);
    const keys = Object.keys(req.body)
    console.log(keys);
    const productInfo = keys.filter((ele)=>{
        return ele.includes('prd')
    })
    console.log(productInfo);
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
        userId: "zffsfsfsf",
        product: product,
        status: status,
      });
      res.json({mess: "Tạo đơn hàng thành công", status: 200, data: data});
    } catch (error) {
      res.json(error);
    }
  };

  module.exports.deleteCart = (req, res)=>{
      cartModel.deleteMany({userId: "zffsfsfsf"})
      .then(data=>{
          res.json(data)
      })
      .catch(err=>{
          res.json(err)
      })
  }
