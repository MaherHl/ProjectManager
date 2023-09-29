import React from 'react'
import logo from '../assets/images/logo2.png'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div class='mb-5'>
        <nav class="navbar navbar-expand-lg bg-body-tertiary ">
  <div class="container-fluid">
    
    <div className='d-felx'>

    <img class='img-fluid ' style={{height:50}}  src={logo} alt="" />
    <a class="navbar-brand text-warning fw-bolder " href="#">GUANLI</a>
    </div>
    
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      
        
      <form class="d-flex  ms-auto" role="search">
        <Link to="/login" class="btn btn-outline-primary m" type="submit">Log In</Link>
      <Link to='/signup'class="btn btn-primary mx-2" type="submit">Sign Up</Link>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar