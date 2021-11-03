const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const controllerAdmin = require("../controllers/adminController");
const { ProductModel, accountmodel } = require("../models/db_mongoose");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/upload"));
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });
  
  const upload = multer({ storage: storage });

  router.post("/addProduct", upload.array("products", 12), async (req, res)=>{
    try {
        console.log(req.body);
        if (req.files.length > 0) {
            let arr = []
            for (let i = 0; i < req.files.length; i++) {
                let index = req.files[i].path.indexOf("upload");
                let link =
                  "/public/" + req.files[i].path.slice(index, req.files[i].path.length);    
                arr.push(link)
            }
            console.log(arr);
                                     
                const data = await ProductModel.create(
                    {
                        name: req.body.name,
                        prd_key: req.body.prd_key,             
                        price: req.body.price,
                        quantity: req.body.quantity,
                        codeProduct: req.body.codeProduct,
                        descriptionDetails: req.body.descriptionDetails,
                        img: arr,
                    }
                    )
                   
                        res.json({
                          status: 200,
                          mess: "add product compelete",
                          data: data,
                        });
                      
            } else {
                res.json({
                    status: 400,
                    mess: "not add",
                    data: data,
                  });
         
            }
    
        
    } catch (error) {
        res.json({ status: 500, mess: "loi server", error });
    }
})

router.put("/fixProduct/:id", upload.array("products", 12), async (req, res) => {
    try {

        if (req.files.length > 0) {
            let arr = []
            for (let i = 0; i < req.files.length; i++) {
                let index = req.files[i].path.indexOf("upload");
                let link =
                  "/public/" + req.files[i].path.slice(index, req.files[i].path.length);    
                arr.push(link)
            }
            const data = await ProductModel.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    name: req.body.name,
                    codeProduct: req.body.codeProduct,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    prd_key: req.body.prd_key,
                    rate: req.body.Rate,
                    descriptionDetails: req.body.descriptionDetails,
                    img: arr

                }
                )
                if (data) {
                    res.json({
                      status: 200,
                      mess: "change product compelete",
                      data: data,
                    });
                  }
        } else {

            const data = await ProductModel.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    name: req.body.name,
                    codeProduct: req.body.codeProduct,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    prd_key: req.body.prd_key,
                    rate: req.body.Rate,
                    descriptionDetails: req.body.descriptionDetails,
                }
                )
                if (data) {
                    res.json({
                      status: 200,
                      mess: "change product compelete",
                      data: data,
                    });
                  }
     
        }

    } catch (error) {
      res.json({ status: 500, mess: "loi server", error });
    }
  });



router.delete("/deleteProduct/:id", async (req, res)=>{
    try {
        const result = await ProductModel.findByIdAndDelete(
            {_id: req.params.id},           
        )
        if(result.deletedCount !== 0){
            res.json({mess: "delete compelete", status: 200})
        }else{
            res.json({mess: "delete not compelete", status: 400})
        }
        
    } catch (error) {
        res.json({ status: 500, mess: "loi server", error });
    }
})

router.put("/updateRole/:id", async (req, res)=>{
    try {
        const result = await accountmodel.findByIdAndUpdate(
            {_id: req.params.id}, 
            {role: req.body.role}
        )
        if(result){
            res.json({mess: "update Role compelete", status: 200, data: result})
        }else{
            res.json({mess: "not update compelete", status: 400})
        }
        
    } catch (error) {
        res.json({ status: 500, mess: "loi server", error });
    }
})



router.get("/", controllerAdmin.adminHome);

router.get("/listUser", controllerAdmin.adminlistUser);

router.get("/listOrder", controllerAdmin.adminlistOrder);

router.get("/listProduct", controllerAdmin.adminlistProduct);

router.get("/addProduct", controllerAdmin.adminaddProduct);

router.get("/changePass", controllerAdmin.adminchangePass);

router.get("/changeProfile", controllerAdmin.adminchangeProfile);

router.get("/getPrd", controllerAdmin.getProduct)

router.get("/getUser", controllerAdmin.getUser)

router.get("/pavigationProduct", controllerAdmin.pavigationProduct)

router.get("/pavigationUser", controllerAdmin.pavigationUser)

module.exports = router;
