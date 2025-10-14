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
        // default:'##**$_default@@@###k93'
        default:null
    },
    otpExpires:{
        type:Date
    }
}, {timestamps:true} );

const usermodel = mongoose.model("usermodel", userSchema)

module.exports = usermodel;