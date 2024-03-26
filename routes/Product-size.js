const express = require("express")
const route = express.Router()

const { CreateProductSize, GetProductSize, UpdateProductSize, DeleteProductSize } = require("../controller/ProductSizeController")


route.post("/Create",CreateProductSize)
route.get("/get",GetProductSize)
route.patch("/update/:id",UpdateProductSize)
route.delete("/delete/:id",DeleteProductSize)


module.exports = route