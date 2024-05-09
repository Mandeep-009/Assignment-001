import React from 'react'
import Navbar from '../components/Navbar'

const Login = () => {
  return (
    <div>
        <Navbar />
        <div className='container' style={{height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '400px', height: '60vh', border: '2px solid black'}}>
                <div>Username</div>
                <div><input type="text" /></div>
                <div>Password</div>
                <div><input type="password" /></div>
            </div>
        </div>
    </div>
  )
}

export default Login