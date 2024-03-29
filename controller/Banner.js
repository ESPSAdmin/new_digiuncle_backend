
const AWS = require('aws-sdk')
require("dotenv").config()

const {BannerTable} = require("../model/BannerModal")



const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const CreateBanner = async (req, res) => {
    const { path } = req.body
    const Image = req.file
    console.log(Image)
    

    try {
       
        if (!Image) {
            return res.status(403).json({
                message: "image is required"
            })
        }
        let newFilename = Image.originalname.replace(/[^\w]/gi, '');
        
        const Key = `${Date.now()}-${newFilename}`;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key,
            Body: Image.buffer,
            ContentType: Image.mimetype,
        };

        const s3UploadResult = await s3.upload(params).promise();

        const create = await BannerTable.create({
            path,
            image_url: s3UploadResult.Location,
            
        })

        return res.status(201).json({
            message: "Banner addid successful",
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

const GetBanner = async (req, res) => {
    const { authorization } = req.headers
    const auth = authorization?.split(" ")[1]
    try {
        const { id } = jwt.verify(auth, process.env.SECURE_KEY)
        
        if (!id) {
            return res.status(403).json({
                message: "you are not authorize"
            })
        }
        const get = await BannerTable.findAll({where:{
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

const DeleteBanner = async (req, res) => {
    const { image_path } = req.headers
    const { id } = req.params
    try {
        
        if(!id){
            return res.status(403).json({
                message:"you are not authorize"
            })
        }
        const image = image_path.split("/");
        console.log(image)

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: image[3]
        }
        await s3.deleteObject(params).promise()
        const find = await BannerTable.findOne({_id:id})
        if(!find){
            return res.status(404).json({
                message:"data not found"
            })
        }
        const data =   await BannerTable.findByIdAndDelete(id)

        
        return res.status(201).json({
            message: "Banner deleted ",
            data
        })
    } catch (err) {
        console.log("Delete Banner error")
        return res.status(500).json({
            message: "internal server error"
        })
    }
}



module.exports = {
    CreateBanner,
    GetBanner,
    DeleteBanner,
}