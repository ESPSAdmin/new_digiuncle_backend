
const AWS = require('aws-sdk')
require("dotenv").config()
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');

const Category = require("../model/CategoryModule")



const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const CreateCategory = async (req, res) => {
    const { category_name } = req.body
    const Image = req.file
    const { authorization } = req.headers
    const auth = authorization?.split(" ")[1]

    try {
        const { id } = jwt.verify(auth, process.env.SECURE_KEY)
        console.log(id)
        if (!id) {
            return res.status(403).json({
                message: "you are not authorize"
            })
        }
        if (!Image) {
            return res.status(403).json({
                message: "image is required"
            })
        }
        let newFilename = Image.originalname.replace(/\s+/g, '').replace(/\(1\)/g, '');
        const Key = `${Date.now()}-${newFilename}`;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key,
            Body: Image.buffer,
            ContentType: Image.mimetype,
        };

        const s3UploadResult = await s3.upload(params).promise();

        const create = await Category.create({
            category_name: category_name,
            image_url: s3UploadResult.Location,
            category_id: uuidv4(),
            user_id: id
        })

        return res.status(201).json({
            message: "category created successful",
            create
        })

    } catch (err) {
        console.log(" create Category error")
        return res.status(500).json({
            message: "internal server error",
            err
        })
    }
}

const GetCategory = async (req, res) => {
    const { authorization } = req.headers
    const auth = authorization?.split(" ")[1]
    try {
        const { id } = jwt.verify(auth, process.env.SECURE_KEY)
        
        if (!id) {
            return res.status(403).json({
                message: "you are not authorize"
            })
        }
        const get = await Category.findAll({where:{
            user_id:id
        }})
        return res.status(200).json({
            message: "category found",
            data: JSON.stringify(get)
        })
    } catch (err) {
        console.log("Get category error")
        return res.status(500).json({
            message: "internal server error"
        })

    }
}

const DeleteCategory = async (req, res) => {
    const { image_path } = req.headers
    const { id } = req.params
    const {authorization} = req.headers
    const auth = authorization?.split(" ")[1]
    try {
        const varify =  jwt.verify(auth,process.env.SECURE_KEY)
        if(!id){
            return res.status(403).json({
                message:"you are not authorize"
            })
        }
        const image = image_path.split("/");

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: image[3]
        }
        await s3.deleteObject(params).promise()
        const data1 =   await Category.findAll({
            where: {
                user_id:varify.id,
                category_id:id
            } 
        })

        if(!data1){
            return res.status(400).json({
                message:"data not found"
            })
        }
        const data = await Category.destroy({
            where: {
                category_id: id,
            }
        })
        return res.status(201).json({
            message: "category deleted ",
            data
        })
    } catch (err) {
        console.log("Delete category error")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

const GetAllCategory = async (req,res) => {
    try{
        const get = await Category.findAll({})
        if(!get){
            return res.status(403).json({
                message:"data not found"
            })
        }
        return res.status(200).json({
            message:"data found",
            data:JSON.stringify(get)
        })
    }catch(err){
        console.log("get all category error")
        return res.status(500).json({
            message:"internal server error"
        })
    }
}


module.exports = {
    CreateCategory,
    GetCategory,
    DeleteCategory,
    GetAllCategory
}