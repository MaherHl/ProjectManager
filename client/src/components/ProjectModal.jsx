import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setProjects } from '../state/State'
import { useSelector } from 'react-redux/es/hooks/useSelector'



function ProjectModal({user,auth}) {
    
    const [projectName,setProjectName]= useState()
    const [description,setDescription] = useState()
    const [endDate , setEndDate]=useState()
    const dispatch = useDispatch()
    const addProject = async ()=>{
        try {
                const NewProjectresponse = await axios.post(`http://localhost:5000/projects/${user._id}/createProjects`,{
                        ProjectName:projectName,
                        description:description,
                        endDate:endDate
                    },
                    {
                        headers:{
                            Authorization: `Bearer ${auth}`
                        }
                    }
                    )
                   const NewProject  = await  NewProjectresponse.data
        
                    if(NewProject){
                      dispatch(setProjects({ projects: NewProject }));
                        
                        setProjectName('')
                        setDescription('')
                        setEndDate('')
                        alert('Project has been added sucessfuly')
                    }
                
            } catch (error) {
                console.log(error)
            }



    }



  return (
    <div>
    {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal for @getbootstrap</button> */}

<div class="modal fade" id="example2Modal" tabindex="-1" aria-labelledby="example2ModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="example2ModalLabel">New Project</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Project Name:</label>
            <input type="text" class="form-control" value={projectName} onChange={(e)=>setProjectName(e.target.value)} id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">End Date:</label>
            <input type="date" class="form-control" value={endDate} onChange={(e)=>setEndDate(e.target.value)} id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Description</label>
            <textarea class="form-control" value={description} onChange={(e)=>setDescription(e.target.value)} id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={addProject} class="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
</div>
</div>
  )
}

export default ProjectModal