const mongoose = require('mongoose');


const ProductSize = mongoose.Schema({
    product_id:{
        type:String,
        required:true,
        allowNull:true
    },
    Product_color:{
        type:String,
        required:true,
        allowNull:true
    },
    product_size:{
        type:[String],
        required:true,
        allowNull:true
    },
    Product_image:{
        type:[String],
        allowNull:true
    },
    price:{
        type:[Number],
        allowNull:true
    },
   
    
},{timestamps:true})


const ProductSizeModel = mongoose.model("ProductSize",ProductSize)

module.exports = {
    ProductSizeModel
}