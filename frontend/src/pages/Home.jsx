import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const Home = () => {
  return (
    <div>
        <Logo />
        <div style={{height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{margin: '50px'}}>Welcome to the home page</div>
            <Link to='/login'><button style={{height: '30px', fontSize: '20px', width: '100px'}}>Login</button></Link>
        </div>
    </div>
  )
}

export default Home