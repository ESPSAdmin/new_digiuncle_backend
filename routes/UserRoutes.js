const express = require("express")
const route = express.Router()
const { CreateUser, LoginUser, UpdateUser, Getuser } = require("../controller/UserController")
const Authorization = require("../middleware/Authorization")

route.post("/create",CreateUser)
route.post("/login",LoginUser)
route.get("/get",Authorization,Getuser)
route.patch("/update/:id",Authorization,UpdateUser)


module.exports = route