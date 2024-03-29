const {OrderTable} = require("../model/OrderModule")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const BuyOrder = async(req,res)=>{
    const data = req.body
    const newData = new OrderTable(data)
    try{
        const create = await OrderTable.create(newData)
        return res.status(201).json({
            message:"Ordered successfull",
            data:create
        }) 
    }catch(err){
        console.log("Buy ordere error ")
        return res.status(500).json({
            message:"intrenal server error"
        })
    }
}

const CancelOrder = async(req,res)=>{
    const {status} = req.body
    const {id} = req.params
    try{
        const find = await OrderTable.findOne({_id:id})
        if(!find){
            return res.status(403).json({
                message:"order not found"
            })
        }
        find.status = status
        const change = await find.save()
        return res.status(201).json({
            message:"Ordere cancel",
            data:change
        })
    }catch(err){
        console.log("Cancel ordere error ")
        return res.status(500).json({
            message:"intrenal server error"
        })
    }
}

const DeliveredOrder = async(req,res)=>{
    const {status} = req.body
    const {id} = req.params
    try{
        const find = await OrderTable.findOne({_id:id})
        if(!find){
            return res.status(403).json({
                message:"order not found"
            })
        }
        find.status = status
        const change = await find.save()
        return res.status(201).json({
            message:"Order delivered",
            data:change
        })
    }catch(err){
        console.log("Cancel ordere error ")
        return res.status(500).json({
            message:"intrenal server error",
        })
    }
}

module.exports = {
    BuyOrder,
    CancelOrder,
    DeliveredOrder
}