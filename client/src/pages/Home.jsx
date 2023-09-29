import React from 'react'
import Navbar from '../components/Navbar'
import bg from "../assets/images/bg1.png"
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div class='bg-body-tertiary vh-100'>
        <Navbar/>
        <div className='d-flex container    ' style={{backgroundColor: ''}}>
            <div className='w-50 mt-5 '>
            <h1 class='text-primary fw-bold ls-tight '>
            <span class="text-warning fw-bolder fs-1"> GUANLI</span> brings all your tasks, teammates, and <br />tools together
            </h1>
            <p style={{color: "hsl(217, 10%, 50.8%)"}}>Keep everything in the same place—even if your team isn’t.</p>
            <Link to="/signup" class="btn btn-outline-primary  w-25" type="submit">Join us Now</Link>

            </div>
            <div className='w-70'>
                <img src={bg} alt="" />
            </div>
            </div>
    </div>
  )
}

export default Home