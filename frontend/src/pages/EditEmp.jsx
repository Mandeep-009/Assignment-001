import Logo from '../components/Logo'
import Navbar from '../components/Navbar'
import React , { useState } from 'react'

const EditEmp = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [mobile,setMobile] = useState('');
    const [designation,setDesignation] = useState('');
    const [gender,setGender] = useState('');
    const [course,setCourse] = useState('');

    const submitHandler = ()=>{

    }
  return (
    <div>
      <Logo />
      <Navbar />
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '400px', margin: '20px', border: '2px solid black'}}>
                <div style={{margin: '20px 0 30px 0'}}><h2>New Employee</h2></div>
                <div>Name</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="text" /></div>
                <div>Email</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="text" /></div>
                <div>Mobile No.</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="tel" pattern='[0-9]{10}' /></div>
                <div>Designation</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="text" /></div>
                <div>Gender</div>
                <div style={{margin: '5px 0 15px 0'}}><span>M</span><input type="radio" name='gender' value={'M'} /><span style={{margin: '0 0 0 15px'}}>F</span><input type="radio" name='gender' value={'F'} /></div>
                <div>Course</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="text" /></div>
                <div>Image upload</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="file" /></div>
                <div><button style={{margin: '15px', width: '80px'}} onClick={submitHandler}>Submit</button></div>
            </div>
        </div>
    </div>
  )
}

export default EditEmp
