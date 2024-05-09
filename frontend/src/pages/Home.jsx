import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Navbar />
        <div style={{height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Link to='/login'><button style={{height: '30px', fontSize: '20px', width: '100px'}}>Login</button></Link>
        </div>
    </div>
  )
}

export default Home