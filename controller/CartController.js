const { CartTable } = require("../model/CartModule")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const AddtoCart = async (req, res) => {
    const data = req.body

    const { authorization } = req.headers
    const auth = authorization?.split(" ")[1]




    try {
        const { id } = jwt.verify(auth, process.env.SECURE_KEY)

        const newdata = new CartTable({ ...data, user_id: id })


        const find = await CartTable.findOne({
            user_id: newdata.user_id,
            product_price: newdata.product_price,
            product_color: newdata.product_color,
            product_size: newdata.product_size,
            product_name: newdata.product_name,
            product_image: newdata.product_image
        })


        if (find) {
            find.product_qty = newdata.product_qty + 1
            const data = await find.save()
            return res.status(200).json({
                message: "Product qty added",
                data
            })
        }


        const create = await CartTable.create(newdata)
        return res.status(201).json({
            message: "Item add to cart",
            data: create
        })
    } catch (err) {
        console.log("add to cart error ")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

const RemoveCart = async (req, res) => {
    const { id } = req.params
    try {
        const find = await CartTable.findOne({ _id: id })
        if (!find) {
            return res.status(403).json({
                message: "data not found"
            })
        }
        const delet = await CartTable.findByIdAndDelete(id)
        return res.status(201).json({
            message: "Item remove to cart"
        })
    } catch (err) {
        console.log("remove to cart error")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

const GetCart = async (req, res) => {
    try {
        const find = await CartTable.find({})

        if (!find) {
            return res.status(404).json({
                message: "data not found"
            })
        }
        return res.status(200).json({
            message: "data found",
            data: JSON.stringify(find)
        })
    } catch (err) {
        console.log("Get Cart error")
        return res.status(500).json({
            message: "intgernal server error"
        })
    }
}

const AddCartQty = async (req, res) => {
    const {qty} = req.body
    const { id } = req.params

    try {

        const find = await CartTable.findOne({ _id:id })


        if (!find) {
            return res.status(403).json({
                message: "data not found"
            })
        }

        find.product_qty = qty
        const data = await find.save()
        return res.status(200).json({
            message: "Product qty added",
            data: find
        })

    } catch (err) {
        console.log("add to cart error ")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}


module.exports = {
    AddtoCart,
    RemoveCart,
    GetCart,
    AddCartQty
}