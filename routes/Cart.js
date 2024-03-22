const express = require("express")
const route = express.Router()

const { AddtoCart, RemoveCart, GetCart, AddCartQty } = require("../controller/CartController")
const Authorization = require("../middleware/Authorization")

route.post("/add-to-cart",Authorization,AddtoCart)
route.delete("/remove-to-cart/:id",Authorization,RemoveCart)
route.get("/get-cart",Authorization,GetCart)
route.post("/add-qty/:id",Authorization,AddCartQty)


module.exports = route