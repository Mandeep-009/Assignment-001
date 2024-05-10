import React, { useState } from 'react'
import Logo from '../components/Logo'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async () => {
      try {
        if(username==='' || password==='')
          return window.alert('Fill all fields: username and password');
        const response = await axios.post('http://localhost:5173/api/auth/login',{username,password});
        if(response) {
          localStorage.setItem("username",username);
          navigate('/dashboard');
          // console.log(response)
        }
      } catch (error) {
        if(error.response)
          window.alert(error.response.data.message)
        else
          console.error('An error occured: ', error.message);
      }
    }
  return (
    <div>
        <Logo />
        <div className='container' style={{height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '400px', height: '60vh', border: '2px solid black'}}>
                <div style={{margin: '20px 0 30px 0'}}><h2>Admin Login Page</h2></div>
                <div>Username</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="text" onChange={(e)=>setUsername(e.target.value)} /></div>
                <div>Password</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="password" onChange={(e)=>setPassword(e.target.value)} /></div>
                <div><button style={{margin: '15px', width: '80px'}} onClick={submitHandler}>Login</button></div>
            </div>
        </div>
    </div>
  )
}

export default Login