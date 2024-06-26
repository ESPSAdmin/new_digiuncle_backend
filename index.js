const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const swaggerUi = require('swagger-ui-express');
require("dotenv").config()

// local imports 

const userRoute = require("./routes/UserRoutes")
const productRoute = require("./routes/ProductRout")
const CategoryRoute = require("./routes/Category")
const CartRoute = require("./routes/Cart")
const connect = require("./connection/MongoDb")
const payement = require("./payements/Payements")
const InformationRoute = require("./routes/Information")
const Authorization = require("./middleware/Authorization")
const Product_size = require("./routes/Product-size")
const OrderRoute = require("./routes/Order")
const BannerRoute = require("./routes/Banner")
const swaggerDocument = require('./swagger.json');



connect()
app.use(bodyParser.json({ extended: true, limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }))
app.use(cors())
app.use(express.json({ extended: true, limit: "5mb" }))
app.use(express.static('public'));


// all routes

app.use("/user",userRoute)
app.use("/product",productRoute)
app.use("/category",CategoryRoute)
app.use("/cart",CartRoute)
app.use("/information",InformationRoute)
app.use("/product-size",Product_size)
app.use("/orders",OrderRoute)
app.use("/banner",BannerRoute)


// payement routes
app.post("/create-checkout-session",Authorization,payement)



const Port = process.env.Port



app.listen(Port, () => {
    console.log(`Server is up and running on port ${Port}`);
    console.log(`Mysql Database is connected`);
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', (req, res) => {
    return res.send("hello world")
})



