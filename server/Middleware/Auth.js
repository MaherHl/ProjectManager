const Jwt = require("jsonwebtoken");
  const verifyToken = async (req,res,next)=>{
    try {
        let token = req.header('authorization')
        if (!token){
            return res.status(403).json("access denied")
        }
        if (token.startsWith("Bearer ")){
            token= token.slice(7,token.length).trimLeft();
        }
        const verified =  Jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = verified
        next()
    } catch (err) {
         res.status(500).json({error: err.message})
    }
 }
 module.exports ={verifyToken}
 