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
    },searchHistory:{
        type:[String],
        default:[]
    }
}, {timestamps:true} );

const usermodel = mongoose.model("usermodel", userSchema)

module.exports = usermodel;