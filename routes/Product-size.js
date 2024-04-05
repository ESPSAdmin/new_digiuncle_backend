const express = require("express")
const route = express.Router()
const multer = require("multer");

const { CreateProductSize, UpdateProductSize, DeleteProductSize } = require("../controller/ProductSizeController");

const upload  = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 * 1024,
    }
});

route.post("/create",upload.array("Product_image"),CreateProductSize)
route.patch("/update/:id",UpdateProductSize)
route.delete("/delete/:id",DeleteProductSize)


module.exports = route