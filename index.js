const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
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

app.post("/create-checkout-session",Authorization,payement)



const Port = process.env.Port



app.listen(Port, () => {
    console.log(`Server is up and running on port ${Port}`);
    console.log(`Mysql Database is connected`);
})


app.use('/', (req, res) => {
    return res.send("hello world")
})