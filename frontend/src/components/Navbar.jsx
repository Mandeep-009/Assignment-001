import React, { useState } from 'react'

const Navbar = () => {
    const [username,setUsername] = useState('');
  return (
    <div>
        <div style={{display: 'flex', alignContent: 'flex-start', margin: '50px'}}>Logo</div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <ul style={{display: 'flex', flexDirection: 'row', gap: '50px', listStyle: 'none'}}>
                <li>Home</li>
                <li>Employee List</li>
            </ul>
            
            <span style={{margin: '15px 25px'}}>
                <span style={{margin: '0 25px'}}>{username}</span>
                {username===''?(<span>Login</span>):(<span>Logout</span>)}
            </span>
        </div>
    </div>
  )
}

export default Navbar