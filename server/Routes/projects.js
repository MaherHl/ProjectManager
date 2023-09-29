const express = require('express') 
const {deleteProject, createProject,getProjects,getContributors} = require('../Controllers/Projects')
const {verifyToken} = require('../Middleware/Auth')
const router = express.Router()



router.post('/:userId/createProjects',verifyToken,createProject)
router.get('/:userId/getProjects',verifyToken,getProjects)
router.delete('/:userId/:projectId/deleteProject',verifyToken,deleteProject)
router.get('/:projectId/getContributors',getContributors)

module.exports= router