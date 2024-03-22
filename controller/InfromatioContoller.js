const Address = require("../model/AddressModule")
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken")
require("dotenv").config()

const createInfo = async (req, res) => {
    const data = req.body
    const { authorization } = req.headers
    const auth = authorization?.split(" ")[1]

    try {
        const { id } = jwt.verify(auth, process.env.SECURE_KEY)

        if (!id) {
            return res.status(403).json({
                message: "you are not authorize"
            })
        }

        const create = Address.create({
            ...data, user_id: id, info_id: uuidv4()
        })
        return res.status(201).json({
            message: "information added successful",
            data: create
        })
    } catch (err) {
        console.log("Create info error")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

const GetInformation = async (req, res) => {
    const { authorization } = req.headers
    const auth = authorization?.split(" ")[1]

    try {
        const { id } = jwt.verify(auth, process.env.SECURE_KEY)

        if (!id) {
            return res.status(403).json({
                message: "you are not authorize"
            })
        }
        const find = await Address.findAll({where:{user_id:id}})
        return res.status(201).json({
            message: "data found",
            data: JSON.stringify(find)
        })
    } catch (err) {
        console.log("get information error")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

const UpadetInfo = async (req, res) => {
    const data = req.body
    const { id } = req.params
    try {


        const get = await Address.findOne({
            where: { info_id: id }
        })

        if (!get) {
            return res.status(403).json({
                message: "data not found"
            })
        }
        const update = await get.update(data)

        return res.status(201).json({
            message: "information update successful",
            data: update
        })
    } catch (err) {
        console.log("update info error")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

const deleteInfo = async (req, res) => {
    const data = req.body
    const { id } = req.params
    const {authorization} = req.headers
    const auth = authorization?.split(" ")[1]
   
    try {
        const verify =  jwt.verify(auth,process.env.SECURE_KEY)
        
        if(!verify){
            return res.status(403).json({
                message:"you are not authorize"
            })
        }
        const get = await Address.findOne({
            where: { info_id: id,user_id:verify.id }
        })
        if (!get) {
            return res.status(403).json({
                message: "data not found"
            })
        }
        const update = await get.destroy()

        return res.status(201).json({
            message: "information delete successful",
            data: update
        })
    } catch (err) {
        console.log("delete info error")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

module.exports = {
    createInfo,
    GetInformation,
    UpadetInfo,
    deleteInfo
}