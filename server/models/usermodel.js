const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    pwd:{
        type:String,
        required:true
    },
    searchHistory:{
        type:[String],
        default:[]
    },
    otp:{
        type:String,
        default:null
    },
    otpExpires:{
        type:Date
    },
    tokens:{
        type:Number,
        default:0
    }
}, {timestamps:true} );

const usermodel = mongoose.model("usermodel", userSchema)

module.exports = usermodel;