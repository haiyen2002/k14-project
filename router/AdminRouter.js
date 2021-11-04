const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const controllerAdmin = require("../controllers/adminController");
const { ProductModel, accountmodel, orderssModel } = require("../models/db_mongoose");
const check = require("../controllers/checkAuth")

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
router.put("/updateStatus/:id", async (req, res)=>{
    try {
        const result = await orderssModel.findByIdAndUpdate(
            {_id: req.params.id}, 
            {status: req.body.status}
        )
        if(result){
            res.json({mess: "update Status compelete", status: 200, data: result})
        }else{
            res.json({mess: "not update compelete", status: 400})
        }
        
    } catch (error) {
        res.json({ status: 500, mess: "loi server", error });
    }
})

router.delete("/deleteUser/:id", async (req, res)=>{
    try {
        const result = await accountmodel.findByIdAndDelete(
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

router.post("/changeProfile", upload.single("thumbnail"), async (req, res) => {
    try {
      if (req.cookies.user) {
        const token = req.cookies.user;
        const id = jwt.verify(token, "Auth").id;
        // console.log(req.file);
        if (req.file != undefined) {
          let index = req.file.path.indexOf("upload");
          let link =
            "/public/" + req.file.path.slice(index, req.file.path.length);
          const data = await accountmodel.findByIdAndUpdate(
            { _id: id },
            {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              phone: req.body.phone,
              email: req.body.email,
              birthday: req.body.birthday,
              avatar: link,
            }
          );
          if (data) {
            res.json({
              status: 200,
              mess: "change profile compelete",
              data: data,
            });
          }
        } else {
          const data = await accountmodel.findByIdAndUpdate(
            { _id: id },
            {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              phone: req.body.phone,
              email: req.body.email,
              birthday: req.body.birthday,
            }
          );
          if (data) {
            res.json({
              status: 200,
              mess: "change profile compelete",
              data: data,
            });
          }
        }
      }
    } catch (error) {
      res.json({ status: 500, mess: "loi server", error });
    }
  });

router.get("/", check.checkLogin, check.checkAdmin , controllerAdmin.adminHome);

router.get("/listUser", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminlistUser);

router.get("/listOrder", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminlistOrder);

router.get("/listProduct", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminlistProduct);

router.get("/addProduct", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminaddProduct);

router.get("/changePass", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminchangePass);

router.get("/changeProfile", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminchangeProfile);

router.post("/getPrd", controllerAdmin.getProduct)

router.post("/getUser", controllerAdmin.getUser)

router.post("/getOrder", controllerAdmin.getOrder)

router.post("/pavigationProduct", controllerAdmin.pavigationProduct)

router.post("/pavigationUser", controllerAdmin.pavigationUser)

router.post("/pavigationOrder", controllerAdmin.pavigationOrder)

router.put("/changePass", controllerAdmin.postChangePass)



module.exports = router;
