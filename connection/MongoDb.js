const mongoose = require("mongoose")
require("dotenv").config()


const connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true , useUnifiedTopology:true}).then(()=>{
        console.log("mongodb database is connect")
    }).catch(()=>{
        console.log("mongodb database is not connected please check")
    })
}

module.exports = connect