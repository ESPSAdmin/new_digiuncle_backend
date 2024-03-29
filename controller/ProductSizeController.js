const { ProductSizeModel } = require("../model/ProductSize")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const CreateProductSize = async (req, res) => {
    const value = req.body
    
    const { authorization } = req.headers
    const auth = authorization?.split(" ")[1]
    try {
        const { id } = jwt.verify(auth, process.env.SECURE_KEY)

        if (!id) {
            return res.status(403).json({
                message: "you are not authorize"
            })
        }
        const newValue = new ProductSizeModel({...value,user_id:id})
        const data = await ProductSizeModel.create(newValue)
        return res.status(201).json({
            message: "size created",
            data
        })
    } catch (err) {
        console.log("Create product size error ")
        return res.status(500).json({
            message: "internal server error"
        })
    }

}

const GetProductSize = async (req, res) => {
    try {
        const data = await ProductSizeModel.find({})
        return res.status(201).json({
            message: "data found",
            data: data
        })
    } catch (err) {
        console.log("get product size error")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

const UpdateProductSize = async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const find = await ProductSizeModel.findOne({ _id: id })

        if (!find) {
            return res.status(403).json({
                message: "product not exist"
            })
        }


        find.product_size = data.product_size
        find.price = data.price
        const result = await find.save()
        return res.status(200).json({
            message: "Product size is updated",
            data: result
        })


    } catch (err) {
        console.log("update product size error ")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

const DeleteProductSize = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const find = await ProductSizeModel.findOne({ _id: id })
        console.log(find)
        if (!find) {
            return res.status(403).json({
                message: "data not found"
            })
        }

        const result = await ProductSizeModel.findByIdAndDelete(id)
        return res.status(200).json({
            message: "product size deleted ",
            data: result
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "internal server error"
        })
    }
}


module.exports = {
    CreateProductSize,
    GetProductSize,
    UpdateProductSize,
    DeleteProductSize
}