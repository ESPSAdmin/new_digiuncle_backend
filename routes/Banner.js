const express = require("express")
const route = express.Router()
const multer = require("multer");
const { CreateBanner, DeleteBanner } = require("../controller/Banner");


const upload  = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 5 * 1024 * 1024,
    }
});

route.post("/add-poster",upload.single("image"),CreateBanner)
route.delete("/Delete-poster/:id",DeleteBanner)


module.exports = route