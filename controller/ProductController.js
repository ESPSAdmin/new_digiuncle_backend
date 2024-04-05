
const { Product_table } = require("../model/ProductModule")
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const { ProductSizeModel } = require("../model/ProductSize");
require("dotenv").config()


const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});


const CreateProduct = async (req, res) => {
    const data1 = req.body
    const images = req.files;
    const { authorization } = req.headers
    const auth = authorization?.split(" ")[1]
   

    if (!images || images.length === 0) {
        return res.status(400).json({
            message: "Images field is empty"
        });
    }


    try {
        const { id } = jwt.verify(auth, process.env.SECURE_KEY)
        const find = await Product_table.findOne({ SKU_id: data1.SKU_id })
        if (find) {
            return res.status(400).json({
                message: "SkU_id is alreday used"
            })
        }

        const uploadedImages = [];

        for (const image of images) {
            let newFilename = image.originalname.replace(/[^\w]/gi, '');
            
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

        const newData = new Product_table({ ...data1, image: uploadedImages, user_id: id })
        const data = await Product_table.create(newData)
        return res.status(201).json({
            message: "product created successful",
            data
        })
    } catch (err) {
        console.log("create product error")
        return res.status(500).json({
            message: "internal server error",
            err
        })
    }
}


const GetProduct = async (req, res) => {
    try {
        const data = await Product_table.find({})
        if (!data) {
            return res.status(200).json({
                message: "data not found",

            })
        }
        return res.status(200).json({
            message: "data found",
            data
        })
    } catch (err) {
        console.log("create product error")
        return res.status(500).json({
            message: "internal server error",
            err
        })
    }
}

const AdminGetProduct = async (req, res) => {
    const { authorization } = req.headers
    const auth = authorization?.split(" ")[1]
    try {
        const { id } = jwt.verify(auth, process.env.SECURE_KEY)

        const find = await Product_table.find({ user_id: id })
        if (!find) {
            return res.status(400).json({
                message: "data not found"
            })
        }
        return res.status(200).json({
            message: "data founded",
            data: find
        })

    } catch (err) {
        console.log("admin get product error")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}


const DeleteProduct = async (req, res) => {
    const { id } = req.params
    const { images_url } = req.headers
    const { authorization } = req.headers
    const auth = authorization?.split(" ")[1]
    const urls = JSON.parse(images_url)


    try {
        const varify = jwt.verify(auth, process.env.SECURE_KEY)
        if (!id) {
            return res.status(403).json({
                message: "you are not authorize"
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
        const find = await Product_table.findOne({_id:id})
        if(!find){
            return res.status(403).json({
                message:"product not exist"
            })
        }
        const data =await Product_table.findByIdAndDelete(id)
        return res.status(200).json({
            message:"Product Deleted successful",
            data
        })
    } catch (err) {
        console.log("create product error")
        return res.status(500).json({
            message: "internal server error",
            err
        })
    }
}

const UpdateProduct = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const find = await Product_table.findOne({ _id: id })
        if (!find) {
            return res.status(403).json({
                message: "product not found"
            })
        }
        const update = await Product_table.findByIdAndUpdate(id, data)
        return res.status(200).json({
            message: "Product updated successful",
            data: update
        })
    } catch (err) {
        console.log("create product error")
        return res.status(500).json({
            message: "internal server error",
            err
        })
    }
}


const SingleProduct = async(req,res)=>{
    const {id} = req.params
    try{
        if(!id){
            return res.status(403).json({
                message:"somthing went wrong"
            })
        }
        const find = await Product_table.findOne({_id:id})
        const findSize = await ProductSizeModel.find({product_id:id})
        return res.status(200).json({
            message:"product data found",
            data:{product:find,product_Sizes:findSize}
        })
        
    }catch(err){
        console.log("signle product error")
    }
}




module.exports = {
    CreateProduct,
    GetProduct,
    DeleteProduct,
    UpdateProduct,
    AdminGetProduct,
    SingleProduct
}