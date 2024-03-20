const express = require('express')
const route = express.Router()
const multer = require("multer")

const { CreateCategory, GetCategory, DeleteCategory } = require('../controller/CategoryController')

const upload  = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 * 1024,
    }
});



route.post("/create",upload.single('image'),CreateCategory)
route.get("/get",GetCategory)
route.delete("/delete/:id",DeleteCategory)

module.exports = route