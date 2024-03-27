const express = require('express')
const route = express.Router()
const { BuyOrder, CancelOrder, DeliveredOrder } = require('../controller/OrderController')

route.post("/buy-order",BuyOrder)
route.put("/cancel-order/:id",CancelOrder)
route.put("/deliver-order/:id",DeliveredOrder)


module.exports = route