const { verify } = require("crypto")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const Authorization = async(req,res,next)=>{

    const {authorization} = req.headers
    const auth = authorization?.split(" ")[1]
    try{
        if(!auth){
            return res.status(403).json({
                message:"unAuthorize"
            })
        }
        const varify = jwt.verify(auth,process.env.SECURE_KEY)
        if(!verify){
            return res.status(403).json({
                message:"unAuthorize"
            })
        }

        next()

    }catch(err){
        console.log("Authorization error")
        return res.status(500).json({
            message:"internal server error"
        })
    }
}

module.exports = Authorization