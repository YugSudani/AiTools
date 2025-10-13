const mongoose = require('mongoose');

const connectDB=async(uri)=>{
    try {
        await mongoose.connect(uri)
        .then(()=>console.log("MongoDB Connected . . ."));
    } catch (error) {
        console.log("Something went wrong in MongoDB connection");
    }
}

module.exports = {
    connectDB
}