
const AWS = require('aws-sdk')
require("dotenv").config()

const Category = require("../model/CategoryModule")



const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const CreateCategory = async (req, res) => {
    const { category_name } = req.body
    const Image = req.file
    console.log(category_name, Image.originalname)

    try {
        if (!Image) {
            return res.status(403).json({
                message: "image is required"
            })
        }
        const Key = `${Date.now()}-${Image.originalname}`;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key,
            Body: Image.buffer,
            ContentType: Image.mimetype,
        };

        const s3UploadResult = await s3.upload(params).promise();

        const create = await Category.create({
            category_name: category_name,
            image_url: s3UploadResult.Location
        })

        return res.status(201).json({
            message: "category",
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
    try {
        const get = await Category.findAll({})
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
    const {image_path} = req.headers
    const {id} = req.params
    try {
        const image = image_path.split("/");
        
        const params = {
            Bucket : process.env.AWS_BUCKET_NAME,
            Key : image[3]
        }
        await s3.deleteObject(params).promise()

       const data =  await Category.destroy({
            where: {
                id:id,
            } 
        })
        return res.status(201).json({
            message:"category deleted ",
            data
        })
    } catch (err) {
        console.log("Delete category error")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}


module.exports = {
    CreateCategory,
    GetCategory,
    DeleteCategory
}