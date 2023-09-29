import React from 'react'
import {FaFacebook,FaTwitter,FaGithub,FaGoogle} from "react-icons/fa"
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Signup() {

  const navigate = useNavigate()
 const [FirstName,setFirstName]=useState('')
 const [LastName,setLastName]=useState('')
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const [avatar,setAvatar]=useState('')

  const handleSubmit= async ()=>{
    const formData = new FormData(); 
      formData.append('FirstName', FirstName);
      formData.append('LastName', LastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', avatar); 

      const registered = await axios.post('http://localhost:5000/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
    const savedUser = await registered.data

    try {
      
      if(savedUser){
        console.log('Navigating to /login')
        navigate('/login')
      }
      
    } catch (error) {
      console.log(error)
    }
   
  }

  return (
    <div>


<section class="">
 
  <div class="px-4 py-5 px-md-5 text-center vh-100  text-lg-start" style={{backgroundColor: "hsl(0, 0%, 96%)"}}>
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

        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="card">
            <div class="card-body py-5 px-md-5">
              <form>
                
                <div class="row">
                <div className=" d-flex flex-column  align-items-center justify-content-center">
                      
                      <h1 className="text-warning  fw-bolder fs-1 mb-5"> GUANLI</h1>
                    </div>
                  <div class="col-md-6 mb-4">
                    
                    <div class="form-outline">
                      <input type="text" id="form3Example1" placeholder='First Name' onChange={(e)=>setFirstName(e.target.value)} class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input type="text" id="form3Example2" placeholder='Last Name' onChange={(e)=>setLastName(e.target.value)} class="form-control" />
                      
                    </div>
                  </div>
                </div>

              
                <div class="form-outline mb-4">
                <input type="file" class="form-control" id="inputGroupFile03" onChange={(e)=>setAvatar(e.target.value)} placeholder='choose a file' aria-describedby="" />              
                </div>
                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} class="form-control" />
                 
                </div>

               
                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} class="form-control" />
                  
                </div>
                            
               
                <div class="d-flex flex-column align-items-center justify-content-center">
                <Link type="submit" to='/login' onClick={handleSubmit} class="btn btn-primary btn-block mb-4 w-50">
                  Sign up
                </Link> 
                <div class="text-center">
                    
                    <p>Already got an account? <Link to="/login">SIGN IN</Link></p>
                  

                </div>
                  
                </div>

                

            
                <div class="text-center">
                  <p>or sign up with:</p>
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-facebook-f"><FaFacebook/></i>
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

export default Signup