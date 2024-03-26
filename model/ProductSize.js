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
    Product_id:{
        type:String,
        required:true,
        allowNull:true
    },
    Category_id:{
        type:String,
        required:true,
        allowNull:true
    },
    user_id:{
        type:String,
        required:true,
        allowNull:true
    },
   
    
},{timestamps:true})


const ProductSizeModel = mongoose.model("ProductSize",ProductSize)

module.exports = {
    ProductSizeModel
}