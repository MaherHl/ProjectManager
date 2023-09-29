import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { setProjects } from '../state/State'
import { useDispatch } from 'react-redux'

function ContributorModal({user,auth}) {

        

    const dispatch = useDispatch()
    const [email, setEmail]= useState('')
    const [projectName,setProjectName]= useState('')
    const addContributor = async()=>{
        try {
            
            const NewContributorresponse = await axios.post(`http://localhost:5000/User/${user._id}/addContributors`,{
                email:email,
                ProjectName:projectName
            },
            {
                headers:{
                    Authorization :`Bearer ${auth}`
                }
            })
            
        const Contributor = await NewContributorresponse.data
        if(Contributor){
           setProjectName('')
           setEmail('')
           alert('Invitation sent')
   
        }
        } catch (error) {
            alert(error.message)
           
            
        }


    }
  return (
    <div>
        <div class="modal fade" id="example3Modal" tabindex="-1" aria-labelledby="example3ModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="example3ModalLabel"> Send Invitation</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Project Name:</label>
            <input type="text" class="form-control" value={projectName} onChange={(e)=>setProjectName(e.target.value)} id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Contributer Email</label>
            <input type="Email" class="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} id="recipient-name"/>
          </div>
        
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button"  onClick={addContributor} class="btn btn-primary">Send</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default ContributorModal