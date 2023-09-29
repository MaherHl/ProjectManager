const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User")

const addTask = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Create a new task
    const newTask = new Task({
      taskName:req.body.taskName,
      description:req.body.description,
      EndDate:req.body.EndDate
    });
    
    // Save the task
    const savedTask = await newTask.save();

    // Find the project by projectId and push the new task's ObjectId to the Tasks array
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $push: { Tasks: savedTask._id } },
      { new: true }
    );

    res.json({ message: "Task added and associated with project", task: savedTask, project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

 const updateToOnDoing = async(req,res)=>{
    try {
        const taskId = req.params.taskId;
    
        // Find the task by taskId
        const task = await Task.findByIdAndUpdate(
          taskId,
          { $set: { ToDo: false, Done:false ,onDoing: true } },
          { new: true }
        );
    
        if (!task) {
          return res.status(404).json({ error: "Task not found" });
        }
    
        res.json({ message: "Task moved from ToDo to Doing", task });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
      }


 }
 const updateToDone = async(req,res)=>{
    try {
        const taskId = req.params.taskId;
    
        // Find the task by taskId
        const task = await Task.findByIdAndUpdate(
          taskId,
          { $set: { ToDo: false, onDoing: false, Done: true } },
          { new: true }
        );
    
        if (!task) {
          return res.status(404).json({ error: "Task not found" });
        }
    
        res.json({ message: "Task moved from ToDo to Doing", task });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
      }


 }
 const deleteTask= async(req,res)=>{
  try {
    const taskId= req.params.taskId
    const userId = req.params.UserId
     const projectId = req.params.projectId
    const user = await User.findOne(userId)
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
  }
    if(user.owner){
      const deletedTask = await Task.findByIdAndDelete(taskId)
      if(!deletedTask) {
        
        return res.status(404).json({ error: "Task not found" });
      }
    
       await Project.findByIdAndUpdate(projectId, { $pull: { Tasks: deletedTask._id } });
     res.json({ message: "Task removed",deletedTask });
    }
    else{
      res.status(500).json({ error: "only the owner can delete the task" });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }

 }

 const getTasks = async(req,res)=>{

  try {
    const projectId = req.params.projectId
    const projects = await Project.findById(projectId)
    .populate('Tasks') // Populate the Tasks array with task details
    .exec();
    if(!projects.Tasks) return res.status(404).json({message: "no Task was found"})
    res.status(200).json(projects)

  } catch (error) {
    res.status(404).json({message: error.message})
    
  }
 }

 module.exports= { addTask ,updateToOnDoing,updateToDone , deleteTask,getTasks};
