const mongoose = require('mongoose');


const ProductSize = mongoose.Schema({
    product_size:{
        type:String,
        required:true,
        allowNull:true
    },
    price:{
        type:Number,
        required:true,
        allowNull:true
    },
    product_id:{
        type:String,
        required:true,
        allowNull:true
    },
    user_id:{
        type:String,
        allowNull:true
    },
   
    
},{timestamps:true})


const ProductSizeModel = mongoose.model("ProductSize",ProductSize)

module.exports = {
    ProductSizeModel
}