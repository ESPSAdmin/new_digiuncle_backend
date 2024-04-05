const { ProductSizeModel } = require("../model/ProductSize")
const jwt = require("jsonwebtoken")
const AWS = require("aws-sdk");
require("dotenv").config()



const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const CreateProductSize = async (req, res) => {
    const value = req.body
    const images = req.files


    const { authorization } = req.headers
    const auth = authorization?.split(" ")[1]
    try {
        const { id } = jwt.verify(auth, process.env.SECURE_KEY)
        if(!id){
            return res.status(400).json({
                message:"unauthorization"
            })
        }
        const price = value.price.split(',').map(Number);
        const size = value.product_size.split(',')
       

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

        const newData = new ProductSizeModel({ ...value, Product_image: uploadedImages,price:price,product_size:size})
        const data = await ProductSizeModel.create(newData)
        return res.status(201).json({
            message: "product size created successful",
            data
        })
    } catch (err) {
        console.log("Create product size error ")
        return res.status(500).json({
            message: "internal server error",
            err
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
    UpdateProductSize,
    DeleteProductSize
}