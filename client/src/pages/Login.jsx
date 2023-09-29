import React from 'react'

import {FaFacebook,FaTwitter,FaGithub,FaGoogle} from "react-icons/fa"
import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setLogin } from "../state/State";
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch()
  const navgiate = useNavigate(); 
 const[email,setEmail]=useState(null)
 const [password,setPassword]= useState(null)
 
 const handeLogin = async()=>{
  try {
    
    const loggedInResponse = await axios.post('http://localhost:5000/Auth/login',{
      email: email,
      password: password
    },
    {

      headers:{
        headers: { "Content-Type": "application/json" },
      }
    }
    )
    const loggedIn = await loggedInResponse.data;
    

    if( loggedIn){
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        }))
        navgiate('/main');
      
    }
  } catch (error) {
    console.log(error)
    
  }
 }   
 



  return (
    <div>

<section class="">

  <div class="px-4 py-5 px-md-5 text-center text-lg-start vh-100" style={{backgroundColor: 'hsl(0, 0%, 96%)'}}>
    <div class="container">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <h1 class="my-5 display-3 fw-bold ls-tight">
            The best offer <br />
            <span class="text-primary">for your business</span>
          </h1>
          <p style={{color: "hsl(217, 10%, 50.8%)"}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>
        </div>

            
       

        <div className="col-lg-6 mb-5 mb-lg-0">
        
                <div className="card ">
                  <div className="card-body py-5 px-md-5">
                    <div className='position-relative mb-5'>
                    <div className=" d-flex flex-column  align-items-center justify-content-center">
                      
                      <h1 className="text-warning  fw-bolder fs-1"> GUANLI</h1>
                    </div>
                    </div>
              <form>
                    

    
                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} class="form-control" />
                  
                </div>

                
                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} class="form-control" />
          
                </div>
                <div class=' d-flex flex-column align-items-center justify-content-center'>
                 
                 <Link to='/main'class="btn btn-primary  mx-6 btn-block mb-4 w-50" onClick={handeLogin} > 
                
                login
             
                 </Link> 
                <div class="text-center">
                    <p>Not a member? <Link to="/signup">Register</Link></p>
                  </div>

                </div>

                
                <div class="text-center">
                  <p>or sign up with:</p>
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab "> <FaFacebook/></i>
                  </button>

                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-google"><FaGoogle/></i>
                  </button>

                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-twitter"><FaTwitter/></i>
                  </button>

                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-github"><FaGithub/></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</section>

    </div>
  )
}

export default Login