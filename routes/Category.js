const express = require('express')
const route = express.Router()
const multer = require("multer")

const { CreateCategory, GetCategory, DeleteCategory, GetAllCategory } = require('../controller/CategoryController')
const Authorization = require("../middleware/Authorization")

const upload  = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 * 1024,
    }
});



route.post("/create",upload.single('image'),Authorization,CreateCategory)
route.get("/get",Authorization,GetCategory)
route.delete("/delete/:id",Authorization,DeleteCategory)
route.get("/get-all",GetAllCategory)

module.exports = route