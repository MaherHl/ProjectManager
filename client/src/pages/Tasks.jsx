import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setTasks , } from '../state/State';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Sidebar from '../components/Sidebar';
import { FaTrash } from 'react-icons/fa';
import { setUser } from '../state/State';

import Cookies from "js-cookies"






function Tasks() {
  const [taskName, setTaskName] = useState('');
  


  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const token = useSelector((state) => state.token);
  const user = useSelector((state)=>state.user)
  
  const project = useSelector((state)=>state.project)

  const { userId,projectId } = useParams();

  const AddTask = async () => {
    try {
      const tasksresponse = await axios.post(`http://localhost:5000/Task/${projectId}/addTasks`, {
        taskName: taskName,
      });

      const NewTask = await tasksresponse.data;

      if (NewTask) {
     
       console.log(NewTask.task._id)
        alert('Task has been added.');
        setTaskName('');
      
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const getTasks = async () => {
    const fetchedtasks = await axios.get(`http://localhost:5000/Task/${projectId}/getTasks`);
    
    const tasks = await fetchedtasks.data.Tasks;
    if(tasks!==null){
      dispatch(setTasks({tasks}))
      
    }

    
  };

  useEffect(() => {
  
    getTasks();
   
  }, [tasks]);
  


  const deleteTask= async(taskId)=>{

    const  deletedTask = await axios.delete(`http://localhost:5000/Task/${userId}/${projectId}/${taskId}/deleteTask`)
   
    if(deletedTask){
      getTasks()

    }

  }
  const updateToOndoing = async(taskId)=>{
    const updatedTask = await axios.patch(`http://localhost:5000/Task/projects/${taskId}/mark-as-doing`)
    const OnDoingTask= updatedTask.data.task
    if(OnDoingTask){
    
      
      getTasks()
    }
    return OnDoingTask
  }

  const updateToDone= async(taskId)=>{

    const updatedTask = await axios.patch(`http://localhost:5000/Task/projects/${taskId}/mark-as-done`)
    const DoneTask  = updatedTask.data.task
    if(DoneTask){
      // dispatch(setDoneTasks({DoneTask}))
      getTasks()
    }
    return DoneTask
  }
  //  const getUSer= async()=>{
  //   const fetchUser =  await axios.get(`http://localhost:5000/User/${userId}/getUsers`)

  //   const user = await fetchUser.data
  //   if(user) {
  //     dispatch(setUser(user))
  //   }

    
  //  }
 

  return (
<section class="vh-100 d-flex" style={{backgroundColor: 'hsl(0, 0%, 96%)'}}>
  <Sidebar user={user}  auth={token} projectId={projectId} />
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-9 col-xl-7">
        <div class="card rounded-3">
          <div class="card-body p-4">

            
      <h1 class="my-5 text-center fw-bold ls-tight" style={{fontFamily:'Didot, serif'}}> Task List </h1>

            <form class="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
              <div class="col-12">
                <div class="form-outline">
                  <input type="text" id="form1" class="form-control" onChange={(e)=>setTaskName(e.target.value)}  placeholder='New Task'/>

                </div>
              </div>

              <div class="col-12">
                <button type="button" onClick={AddTask} class="btn btn-primary" on>Save</button>
              </div>

              
            </form>

            <table class="table table-striped mb-4">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Todo item</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
  {tasks.map((task, index) => (
    <tr key={task._id}>
      <th scope="row">{index + 1}</th>
      <td>{task.taskName}</td>
      <td>{task.ToDo ? "todo" : task.onDoing ? "ondoing" : task.Done ? "Done" : "in progress"}</td>
      <td className='d-flex justify-content-between'>
        <div> 

        <button type="button" className="btn btn-warning" onClick={() => updateToOndoing(task._id)}>On doing</button>
        <button type="button" className="btn btn-primary ms-1" onClick={() => updateToDone(task._id)}>Finished</button>
        </div>
        <div>

        <FaTrash style={{color:"red "}} onClick={()=>deleteTask(task._id)}/>
        </div>
      </td>
    </tr>
  ))}
</tbody>

            </table>

          </div>
        </div>
      
      </div>
    </div>
  </div>
</section>
);
}


export default Tasks;
