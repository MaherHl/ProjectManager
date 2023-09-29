import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { setProjects } from '../state/State'
import { useDispatch } from 'react-redux'

function InvModal({user,auth}) {
  const[ProjectName, setProjectName] = useState()
  const [VerificationCode, setVerificationCode]=useState()
  const [joinSuccess, setJoinSuccess] = useState(false);
  const dispatch = useDispatch()
  
     const joinProject = async()=>{
    

      
       const joinResponse = await axios.patch(`http://localhost:5000/User/${user._id}/joinProject`,{
        ProjectName:ProjectName,
        verificationCode: VerificationCode
       },{
        headers:{
          Authorization : `Bearer ${auth}`
        }
       })
       const updatedProject = await joinResponse.data
       if(updatedProject){
        dispatch(
          setProjects({
            projects: updatedProject
          })
        )

        alert('u have joined successfuly into' + ProjectName)
        setProjectName('');
        setVerificationCode('');
       }
    }
  return (

    <div>
        {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal for @getbootstrap</button> */}

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Work With Your Teamates</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Project Name:</label>
                <input type="text" value={ProjectName} onChange={(e)=>setProjectName(e.target.value)} class="form-control" id="recipient-name"/>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Verification code:</label>
                <input type="text" value={VerificationCode} onChange={(e)=>setVerificationCode(e.target.value)} class="form-control" id="recipient-name"/>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" onClick={joinProject} class="btn btn-primary">Join</button>
          </div>
        </div>
      </div>
    </div>
   
    </div>
  )
}

export default InvModal