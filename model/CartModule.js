const mongoose = require('mongoose');


const Cart = mongoose.Schema({
    user_id:{
        type:String,
        required:true,
        allowNull:true
    },
    product_name:{
        type:String,
        required:true,
        allowNull:true
    },
    product_image:{
        type:String,
        required:true,
        allowNull:true
    },
    product_qty:{
        type:Number,
        required:true,
        allowNull:true
    },
    product_price:{
        type:Number,
        required:true,
        allowNull:true
    },
    product_color:{
        type:String,
        required:true,
        allowNull:true
    },
    product_size:{
        type:String,
        required:true,
        allowNull:true
    },
    
},{timestamps:true})


const CartTable = mongoose.model("cart",Cart)

module.exports = {
    CartTable
}