const express = require("express")
const route = express.Router()
const { CreateUser, LoginUser, UpdateUser } = require("../controller/UserController")

route.post("/create",CreateUser)
route.post("/login",LoginUser)
route.patch("/update/:id",UpdateUser)


module.exports = route