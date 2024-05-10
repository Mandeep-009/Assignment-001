import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
    const name = localStorage.getItem("username");
    const [username,setUsername] = useState(name);
    const navigate = useNavigate();

    const logoutHandler = ()=>{
        localStorage.removeItem("username");
        navigate('/');
    }
  return (
    <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <ul style={{display: 'flex', flexDirection: 'row', gap: '50px', listStyle: 'none', cursor: 'pointer'}}>
                <Link to='/dashboard'><li>Home</li></Link>
                <Link to='/employees'><li>Employee List</li></Link>
            </ul>
            
            <span style={{margin: '15px 25px'}}>
                <span style={{margin: '0 25px'}}>{username}</span>
                <span style={{cursor: 'pointer'}} onClick={logoutHandler}>Logout</span>
            </span>
        </div>
    </div>
  )
}

export default Navbar