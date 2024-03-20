const express = require("express")
const route = express.Router()
const multer = require("multer")


const { CreateProduct, GetProduct, DeleteProduct } = require("../controller/ProductController")

const upload  = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 * 1024,
    }
});

route.post("/create",upload.array('images'),CreateProduct)
route.get("/get",GetProduct)
route.delete("/delete/:id",DeleteProduct)     

module.exports = route