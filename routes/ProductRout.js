const express = require("express")
const route = express.Router()
const multer = require("multer")


const { CreateProduct, GetProduct, DeleteProduct, UpdateProduct, AdminGetProduct, SingleProduct } = require("../controller/ProductController")
const Authorization = require("../middleware/Authorization")

const upload  = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 * 1024,
    }
});

route.post("/create",upload.array('image'),Authorization,CreateProduct)
route.get("/get-admin",Authorization,AdminGetProduct)
route.get("/get",GetProduct)
route.delete("/delete/:id",Authorization,DeleteProduct)     
route.patch("/update/:id",UpdateProduct)            
route.get("/sigle-product/:id",SingleProduct)            

module.exports = route