const User = require("../models/User")


const Project = require("../models/Project")



const createProject = async(req,res)=>{
    
    try {
        const newProject= new Project({
            ProjectName:req.body.ProjectName,
            description:req.body.description,
            endDate:req.body.endDate,
            
        })
        
        // console.log(newProject)
        
        const savedProject = await newProject.save()
        await User.findByIdAndUpdate(req.params.userId, { owner: true,$push:{projects:savedProject._id} });
        
        res.status(201).json(savedProject)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
    


    
    
    }
    const deleteProject= async(req,res)=>{
        try {
          const ProjectId= req.params.projectId
          const userId = req.params.UserId
          const user = await User.findOne(userId)
          
            if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
          if(user.owner){
            
            const deletedProject = await Project.findByIdAndDelete(ProjectId)
            

            
            await User.findByIdAndUpdate(user._id, { $pull: { projects: ProjectId } });
            
            
           if(!deletedProject)  return res.status(404).json({ error: "project not found" });
           res.json({ message: "project removed",deletedProject });
          }
          else{
            res.status(500).json({ error: "only the owner can delete the task" });
          }
          
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "An error occurred" });
        }
      
       }

       const getProjects = async(req,res)=>{

        try {
          const userId = req.params.userId;
          
          const user = await User.findById(userId)
          .populate('projects') 
          .exec();

          
          if(!user){res.status(404).json({message: "user not found"})}
         
      
          res.status(200).json(user)
        } catch (error) {
          res.status(404).json({message: error.message})
          
        }
       }
       const getContributors = async(req,res)=>{

        try {
          const projectId = req.params.projectId
          const projects = await Project.findById(projectId)
          .populate('contributors') // Populate the contributors array with task details
          .exec();
          if(!projects.contributors) return res.status(404).json({message: "no contributors was found"})
          res.status(200).json(projects)
      
        } catch (error) {
          res.status(404).json({message: error.message})
          
        }
       }
module.exports= {deleteProject, createProject,getProjects, getContributors}