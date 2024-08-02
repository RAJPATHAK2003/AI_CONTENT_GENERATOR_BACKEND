const mongoose=require("mongoose");
//Password="GXciNUCe7P48mZFX"
//username="rp9936123"
require('dotenv').config();
const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_LINK);
        console.log("Mongoose is Connected")
    } catch(err){
        console.log(`${err.message}`);
        process.exit(1);
    }
}
module.exports=connectDB;