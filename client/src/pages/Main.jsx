import React from 'react';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash,FaClock } from 'react-icons/fa';
import Countdown from 'react-countdown';
import { setLogin, setProjects } from '../state/State';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContributorModal from '../components/ContributorModal';

function Main() {
const dispatch = useDispatch()
    const fetchProjects = async()=>{
      try {
        
        const projectsRespone= await axios.get(`http://localhost:5000/projects/${User._id}/getProjects`,{
          headers:{
            Authorization:auth
          }
        })
        const fetchedprojects = await projectsRespone.data.projects
        if(fetchedprojects!==null){
          dispatch(setProjects({ projects: fetchedprojects }));
        }
      } catch (error) {
        
        console.log(error)
      }



    }
    const deleteProject = async(projectId)=>{
      
      const deletedProject = await axios.delete(`http://localhost:5000/projects/${User._id}/${projectId}/deleteProject`,{
        headers:{
          Authorization:auth
        }
      })
      if(deletedProject){
        fetchProjects()
      }
    }

    
    const User = useSelector((state)=>state.user)
    const auth =  useSelector((state) => state.token)
    const Project = useSelector((state)=> state.projects)
    useEffect(()=>{
      fetchProjects()
    },[Project])
      const navigate = useNavigate()
    const goToTasks =()=>{
      dispatch(setLogin({user:User,token:auth}))
      navigate(`/tasks/${User._id}/${Project._id}`)
    }

  return (
    <div class='bg-body-tertiary ' style={{ display: 'flex' }}>
     
      <Sidebar user={User} auth={auth}/>
        <div className='d-block'>
      <div class='d-block'>

      <h1 class="my-5  fw-bold ls-tight" style={{fontFamily:'Didot, serif'}}>
        <span className='text-primary'> Welcome !</span> <br/>
            {User.FirstName+' '+ User.LastName} Work Space  </h1>
      </div>
     
      <div className="row row-cols-1 row-cols-md-2 g-3"> {/* Display 2 cards in a row on medium and larger screens */}
  { Array.isArray(Project) ? (

    Project.map((project) => (
      <div key={project._id} className="col-md-6">
        {/* <div class="card w-80">
          <div className="d-flex position relative">
          <div  onClick={()=>deleteProject(project._id)} className="position-absolute  top-0 end-0 me-2">
      <FaTrash style={{color:"red"}} />
    </div>
  
            <div class="card-body">
            
  
              <h5 class="card-title">{project.ProjectName}</h5>
              <h6 class="card-subtitle mb-2 text-danger"> <FaClock/> <Countdown date={new Date(project.endDate)} /></h6>
              <p class="card-text">{project.description}</p>
              <div className="d-flex ">
              <Link type="button" class="btn btn-primary"  onClick={goToTasks} to={`/tasks/${User._id}/${project._id}`}> add Tasks</Link>
              <a type="button" class="btn btn-outline-primary mx-2" data-bs-toggle="collapse">
              <span class="ms-1 d-none d-sm-inline" data-bs-toggle="modal" data-bs-target="#example3Modal" data-bs-whatever="@getbootstrap"> Add Contributers</span>
              </a>
              
   
              </div>
            </div>
          </div>
  </div> */}
  <div class="card card-project">
  <div class="progress " style={{height:'0.50rem' , width:'100%'}} >
  <div class="progress-bar" role="progressbar" style={{width: "55%" , backgroundColor:'lime'  }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
  <div class="card-body">
  <div  onClick={()=>deleteProject(project._id)} className="position-absolute  top-2 end-0 me-2">
      <FaTrash style={{color:"red"}} />
      </div>
    <h5 class="card-title">{project.ProjectName}</h5>
    
    <p class="card-text">{project.description}</p>

    
    <div class="card-meta d-flex justify-content-between position-relative">
      <div className="">

      <Link type="button" class="btn btn-primary"  onClick={goToTasks} to={`/tasks/${User._id}/${project._id}`}> add Tasks</Link>
      </div>
            
            <div className='position-absolute end-0 bottom-0'>

      <h6 class="card-subtitle mb-2 text-danger "> <FaClock/> <Countdown date={new Date(project.endDate)} /></h6>
            </div>
   

    </div>
  </div>
</div>
        </div>
    
    ))
  ) :(  <p>Loading projects...</p>
  )
}
</div>





        </div>
        <ContributorModal user={User} auth={auth}/>
    </div>
  );
}

export default Main;
