const mongoose = require("mongoose");


const Reviews = mongoose.Schema({
    user_id:{
        type:String,
    },
    user_rating:{
        type:Number,
    }
})