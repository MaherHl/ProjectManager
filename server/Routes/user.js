const express = require('express')
 const  {addContributor ,joinProject,getUser} = require('../Controllers/Users')
 const {verifyToken}= require('../Middleware/Auth')
 const router = express.Router()



 router.post('/:userId/addContributors',verifyToken ,addContributor)
 router.patch("/:contributorId/joinProject",verifyToken,joinProject)
 router.get('/:userId/getUsers',getUser)

 module.exports= router