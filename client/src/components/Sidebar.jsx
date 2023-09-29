import React from 'react'
import { setLogout } from '../state/State'
import { useDispatch } from 'react-redux'
import InvModal from '../components/InvModal';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import {FaPlus,FaDoorOpen,FaPeopleArrows} from 'react-icons/fa'
import ProjectModal from './ProjectModal';
import ContributorModal from './ContributorModal';
import  logo from '../assets/images/logo2.png'
import axios from 'axios';
import { setProjects } from '../state/State';
import { FaCircle ,FaCircleNotch } from 'react-icons/fa';

import { useEffect ,useState} from 'react';


function Sidebar({user,auth, projectId})


{
        const [contributors ,setContributors]= useState([])    
    const Project = useSelector((state)=>state.projects)
    const dispatch = useDispatch()
    const getContributors = async(projectId)=>{
        try {
            console.log(projectId)
          
          const ContributorsRespone= await axios.get(`http://localhost:5000/projects/${projectId}/getContributors`,{
            headers:{
              Authorization:auth
            }
          })
          const fetchedprojects = await ContributorsRespone.data
          if(fetchedprojects!==null){
       
            setContributors(fetchedprojects.contributors)
            console.log(fetchedprojects.contributors)
          }
        } catch (error) {
          
          console.log(error)
        }
    
    
    
      }
      useEffect(()=>{
        getContributors(projectId)

      },[projectId])

  return (
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 w-10 me-3 px-0 bg-dark">
    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <img src={logo} className='w-25' alt="" />
            <span class="fs-5 d-none d-sm-inline text-warning fw-bold">GUANLI</span>
        </a>
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          
            <li>
            <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
  <i class="fs-4 bi-speedometer2 "><FaPlus/></i> <span class="ms-1 d-none d-sm-inline" data-bs-toggle="modal" data-bs-target="#example2Modal" data-bs-whatever="@getbootstrap">new Project</span>
</a>

              
            </li>
          
            <li>
                <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-speedometer2 "><FaDoorOpen/></i> <span class="ms-1 d-none d-sm-inline "  data-bs-toggle="modal" data-bs-target="#exampleModal"
         data-bs-whatever="@getbootstrap">Join Project</span> </a>
              
            </li>
            <li>
                
           <a type="" class="nav-link px-0 align-middle" data-bs-toggle="collapse">
           <i class="fs-4 bi-speedometer2 "><FaPlus/></i> <span class="ms-1 d-none d-sm-inline" data-bs-toggle="modal" data-bs-target="#example3Modal" data-bs-whatever="@getbootstrap"> Add Contributers</span>
              </a>
              
            </li>
            
            <li class="nav-item">
                
              
                    <a class=" nav-link align-middle px-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <i class="fs-4 bi-speedometer2 "><FaPeopleArrows/></i>
                    <span class="ms-1 d-none d-sm-inline"> Contributers</span></a>
                   
                        <div class="offcanvas offcanvas-end " tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasRightLabel">Contributors List</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                                { contributors.map((cont) => (
                                    <ul key={cont._id} class="list-group list-group-flush">
                                        
                                    <li class="list-group-item " style={{fontFamily:'Didot, serif'}} > 
                                     <h4>
                                     <i className='mx-2' style={{color:"lime" ,fontSize: "1rem"}}><FaCircle/></i>
                                    {cont.FirstName}  {cont.LastName}
                                     </h4>
                                    </li>

                                    </ul>
                                ))}
                                    <ul  class="list-group list-group-flush">
                                    <li class="list-group-item " style={{fontFamily:'Didot, serif'}} > 
                                     <h4>
                                     <i className='mx-2 fa-xs' style={{color:"lime" ,fontSize: "1rem"}}><FaCircle/></i>
                                        maher hilali
                                     </h4>
                                    </li>
                                    <li class="list-group-item " style={{fontFamily:'Didot, serif'}} > 
                                     <h4>
                                     <i className='mx-2 ' style={{color:"lime",fontSize: "1rem"}}><FaCircle/></i>
                                        Project Manager
                                     </h4>
                                    </li>
                                    <li class="list-group-item " style={{fontFamily:'Didot, serif'}} > 
                                     <h4>
                                     <i className='mx-2 ' style={{color:"lime",fontSize: "1rem"}}><FaCircle/></i>
                                        klaus mkl
                                     </h4>
                                    </li>
                                    <li class="list-group-item " style={{fontFamily:'Didot, serif'}} > 
                                     <h4>
                                     <i className='mx-2 ' style={{color:"lime",fontSize: "1rem"}}><FaCircle/></i>
                                        Hamza Mouddakir
                                     </h4>
                                    </li>
                                    </ul>
                                </div>

                        </div>

            </li>
            
 
            
          
        </ul>
        <hr/>
        <div class="dropdown pb-4">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                {/* <img src={user?.avatar} alt="hugenerd" width="30" height="30" class="rounded-circle"/> */}
                <span class="d-none d-sm-inline mx-1">{user?.FirstName +" "+user?.LastName} </span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
               
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li>
                    <hr class="dropdown-divider"/>
                </li>
                <li><a class="dropdown-item" onClick={()=>dispatch(setLogout())} href="#">Sign out</a></li>
       
            </ul>
            
        </div>
        
    </div>
    <InvModal user={user} auth={auth}/>
    <ProjectModal user={user} auth={auth}/>
    
</div>
  )
}

export default Sidebar