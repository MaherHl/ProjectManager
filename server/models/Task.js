
const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    taskName:{
       type: String,
       required:true
    },
 

    ToDo: {
        type: Boolean,
        default:true 
            },
    onDoing: {
        type: Boolean,
        default: false
        },
    Done :{
        type: Boolean,
        default: false,
    },
 


})
const Task = mongoose.model('Task',TaskSchema)
module.exports=Task