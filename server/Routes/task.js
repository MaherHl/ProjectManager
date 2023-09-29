const express = require('express')
const { addTask ,updateToOnDoing,updateToDone , deleteTask,getTasks} = require('../Controllers/Task')
const {verifyToken}= require('../Middleware/Auth')
const router =  express.Router()



router.patch('/projects/:taskId/mark-as-done',  updateToDone)
router.patch('/projects/:taskId/mark-as-doing',  updateToOnDoing)
router.delete('/:userId/:projectId/:taskId/deleteTask', deleteTask)
router.get('/:projectId/getTasks',getTasks)
router.post('/:projectId/addTasks', addTask);
module.exports= router