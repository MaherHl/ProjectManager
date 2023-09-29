 const bcrypt=  require("bcrypt")
 const jwt = require("jsonwebtoken")
 const User = require("../models/User")


 const register = async(req,res)=>{
    try{
        const {
            FirstName,
            LastName,
            email,
            password
            
        }= req.body
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password,salt)
        const newUser= new User({
            FirstName,
            LastName,
            email,
            password: passwordHash,
            avatar: req.file ? req.file.filename : '' 
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    }

    catch(err){
        res.status(500).json({error:err.message})
    }
}
const login = async(req,res)=>{
    try {
        const{email,password} = req.body
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).json({msg:"user does not exist"})
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg:"invalid credentials"})
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET_KEY)
        delete user.password;
        res.status(200).json({token,user})
        
    } catch (err) {

         res.status(500).json({error:err.message})
    }

  }
  module.exports= {register, login}