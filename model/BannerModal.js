const mongoose = require('mongoose');


const Banner = mongoose.Schema({
    image_url:{
        type:String,
        required:true,
        allowNull:true
    },
    path:{
        type:String,
        required:true,
        allowNull:true
    },
    
    
    
},{timestamps:true})


const BannerTable = mongoose.model("banner",Banner)

module.exports = {
    BannerTable
}