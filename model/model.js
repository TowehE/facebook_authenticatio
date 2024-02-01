const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    password:{
        type:String
    },
    profilePicture:{
        type:String
    },
    email:{
        type:String
    },
    isVerified:{
        type: Boolean,
        
    },
  
  

},{timestamps:true})

const userModel = mongoose.model("user", userSchema)

module.exports =userModel