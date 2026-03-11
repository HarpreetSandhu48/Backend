const mongoose=require("mongoose")

const Userschema=mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    
    otp:{
        type: String
    },
    token:{
        type:String
    }
}) 
module.exports=mongoose.model("User",Userschema)