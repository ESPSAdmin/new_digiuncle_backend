
const Product = require("../model/ProductModule")
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
require("dotenv").config()


const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});


const CreateProduct = async (req, res) => {
    const images = req.files;
    const data = req.body;
    const {authorization} = req.headers
    const auth = authorization?.split(" ")[1]



    if (!images || images.length === 0) {
        return res.status(400).json({
            message: "Images field is empty"
        });
    }

    try {

        const {id} =  jwt.verify(auth,process.env.SECURE_KEY)

        const uploadedImages = [];

        for (const image of images) {
            let newFilename = image.originalname.replace(/\s+/g, '').replace(/\(1\)/g, '');
            const Key = `${Date.now()}-${newFilename}`;

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key,
                Body: image.buffer,
                ContentType: image.mimetype,
            };

            const s3UploadResult = await s3.upload(params).promise();
            
            uploadedImages.push(s3UploadResult.Location);
        }
        const create = await Product.create({ ...data, image: JSON.stringify(uploadedImages),user_id:id,product_id:uuidv4() })

        return res.status(201).json({
            message: "Product created successfully",
            data: create
        });
    } catch (err) {
        console.error("Create product error:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

const GetProduct = async (req, res) => {
    try {
        const data = await Product.findAll({})
        return res.status(200).json({
            message: "product found",
            data: data
        })
    } catch (err) {
        console.log("get product error ")
        return res.status(500).json({
            message: "internal server error "
        })
    }
}

const DeleteProduct = async (req, res) => {
    const { images_url } = req.headers
    const { id } = req.params
    const urls = JSON.parse(images_url)

    const {authorization} = req.headers
    const auth = authorization?.split(" ")[1]

    try {
        const varify =  jwt.verify(auth,process.env.SECURE_KEY)
        if(!id){
            return res.status(403).json({
                message:"you are not authorize"
            })
        }
        const splitUrls = urls.map(url => url.split("/")[3]);

        for (const images of splitUrls) {

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: images
            }
            await s3.deleteObject(params).promise()
        }
        

      const data =   await Product.findAll({
            where: {
                user_id:varify.id,
                product_id:id
            } 
        })

        if(!data){
            return res.status(400).json({
                message:"data not found"
            })
        }

        const delet = await Product.destroy({where:{product_id:id}})
        return res.status(201).json({
            message:"product deleted successful",
            data:delet
        })

        console.log(data)

        

        return res.status(201).json({
            message:"product Deleted",
            data
        })
    } catch (err) {
        console.log("Deleter product error ")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

const AdminGetProduct = async (req,res) => {
    const {authorization} = req.headers
    const auth = authorization?.split(" ")[1]
    try{
        const {id} =  jwt.verify(auth,process.env.SECURE_KEY)
        if(!id){
            return res.status(403).json({
                message:"you are not authorize"
            })
        }
        const get = await Product.findAll({where:{user_id:id}})
        return res.status(201).json({
            message:"admin data found",
            data:get
        })
    }
    catch(err){
        console.log("Admin get product error")
        return res.status(500).json({
            message:"internal server error"
        })
    }
}







module.exports = {
    CreateProduct,
    GetProduct,
    DeleteProduct,
    AdminGetProduct,
}