const mongoose = require("mongoose")
const Task = require("./Task")
const  User  = require("./User")
function generateVerificationCode() {
    const length = 6;
    const characters = "0123456789";
    let code = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
  }
const ProjectSchema  = mongoose.Schema({
ProjectName:{
    type:String,
    required : true
},
description : {
    type: String,
    required : true,
    max : 100
},
Tasks :[{ type: mongoose.Schema.Types.ObjectId, ref: "Task",}
]
,
endDate : {
    type: Date,
    required : true
},

contributors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"}
],
verificationCode:{
    type: String,
   default: generateVerificationCode()
}








},
{timestamps:true}
)
const Project = mongoose.model('Project',ProjectSchema)
module.exports= Project