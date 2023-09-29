
const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type: String,
        default:"",

    },
    projects :[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project", 
       
        
    }],
   
    owner :{
        type: Boolean
    }
    
    
    
    })
    const User =  mongoose.model('User',UserSchema)
    module.exports= User
