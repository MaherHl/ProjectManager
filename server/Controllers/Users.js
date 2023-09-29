const User = require("../models/User")

const Project = require("../models/Project")



const Task = require("../models/Task")

const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
 
  host:"smtp.gmail.com",
  port: 465,
  secure: true,

    auth: {
      user: 'ProjectManager135135@gmail.com',
      pass: 'jodkcfauocgafryk'
    }
  });

  const sendInvitationEmail = (contributorEmail, projectName, verificationCode) => {
    const mailOptions = {
      from: "ProjectManager135135@gmail.com",
      to: contributorEmail,
      subject: "Invitation to Join Project",
      text: `You have been invited to join the project "${projectName}". this is your verification code ${verificationCode}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  };
  
  
const addContributor = async(req,res)=>{
    try {
        
        const userId = req.params.userId
        
       const{email,ProjectName}= req.body;
       const project =  await Project.findOne({ProjectName})
       const verificationCode = project.verificationCode
       
      
       const contributer = await User.findOne({email})
       const user = await User.findById(userId)
       if(!project)  return res.status(404).json({ error: "project not found" });
       if(!contributer)  return res.status(404).json({ error: "user not found" });
       if(user.owner===true){
            sendInvitationEmail(email, project.ProjectName, verificationCode);
           res.json({ message: "Invitation sent to contributor" });
       }
    } catch (error) {
      
        console.error(error);
        
    res.status(500).json({ error: "An error occurred" });
    }




}   
const joinProject= async(req,res)=>{
try {
    const{ProjectName,verificationCode}=  req.body
    const userId = req.params.contributorId
    const user = await User.findById(userId)
     const project = await Project.findOne({ProjectName})
  
     if(!project)  return res.status(404).json({ error: "Project not found" });
     if(project.verificationCode===verificationCode){
            if(user){

               await project.contributors.push(user);
                await project.save();
            }
  
        res.json({ message: "Contributor verified and added" });
     }
     else{
        res.status(400).json({ error: "Invalid verification code" });
     }
    
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
}



}
const getUser = async(req,res)=>{

  try {
     const userId = req.params.userId
    const user = await User.findById(userId);
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({message: error.message})
    
  }
 }
 

 module.exports= {getUser,joinProject,addContributor}