const express = require("express")
const route = express.Router()

const { createInfo, GetInformation, UpadetInfo, deleteInfo } = require("../controller/InfromatioContoller")
const Authorization = require("../middleware/Authorization")

route.post("/create",Authorization,createInfo)
route.get("/get",Authorization,GetInformation)
route.patch("/update/:id",Authorization,UpadetInfo)
route.delete("/delete/:id",Authorization,deleteInfo)



module.exports = route