
const Product = require("../model/ProductModule")
const AWS = require("aws-sdk");
require("dotenv").config()


const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});


const CreateProduct = async (req, res) => {
    const images = req.files;
    const data = req.body;

    console.log(images)


    if (!images || images.length === 0) {
        return res.status(400).json({
            message: "Images field is empty"
        });
    }

    try {
        const uploadedImages = [];

        for (const image of images) {
            const Key = `${Date.now()}-${image.originalname}`;

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key,
                Body: image.buffer,
                ContentType: image.mimetype,
            };

            const s3UploadResult = await s3.upload(params).promise();
            
            uploadedImages.push(s3UploadResult.Location);
        }
        const create = await Product.create({ ...data, image: JSON.stringify(uploadedImages) })

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
            data: JSON.stringify(data)
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
    try {
        const splitUrls = urls.map(url => url.split("/")[3]);

        for (const images of splitUrls) {

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: images
            }
            await s3.deleteObject(params).promise()
        }
        

      const data =   await Product.destroy({
            where: {
                id:id,
            } 
        })
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



module.exports = {
    CreateProduct,
    GetProduct,
    DeleteProduct
}