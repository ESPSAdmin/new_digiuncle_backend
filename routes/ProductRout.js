const express = require("express")
const route = express.Router()
const multer = require("multer")


const { CreateProduct, GetProduct, DeleteProduct, AdminGetProduct, GetSingleProduct, GetSingelProduct } = require("../controller/ProductController")
const Authorization = require("../middleware/Authorization")

const upload  = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 * 1024,
    }
});

route.post("/create",upload.array('images'),Authorization,CreateProduct)
route.get("/get",GetProduct)
route.delete("/delete/:id",Authorization,DeleteProduct)     
route.get("/admin-get",Authorization,AdminGetProduct)        

module.exports = route