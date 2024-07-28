import React, { useEffect, useState } from 'react'
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddEmp = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [mobile,setMobile] = useState('');
    const [designation,setDesignation] = useState('');
    const [gender,setGender] = useState('F');
    const [course,setCourse] = useState('');
    const [image,setImage] = useState();
    const [employee_id,setEmployee_id] = useState('');

    const navigate = useNavigate();

    
      const submitHandler = async (e) => {

        if(!(name&&email&&designation&&mobile&&course&&gender&&employee_id)){
          return alert('fill all fields')
        }
        if(!mobile.match(/^\d+$/)){
          return alert('mobile number should be in numerics only')
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('designation', designation);
        formData.append('course', course);
        const gender_full = (gender==='M') ? 'Male' : 'Female';
        formData.append('gender', gender_full);
        formData.append('employee_id', employee_id);
  
        try {
          const response = await axios.post(`http://localhost:5173/api/employees/new_employee`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response);
          alert('employee added successfully');
          navigate('/employees')
        } catch (error) {
          if(error.response && error.response.data){
            alert(error.response.data.message)
          }
          else {
            console.error('Error uploading data: ', error);
          }
        }
      }
  return (
    <div>
      <Logo />
      <Navbar />
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '400px', margin: '20px', border: '2px solid black'}}>
                <div style={{margin: '20px 0 30px 0'}}><h2>New Employee</h2></div>
                <div>Employee_id</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="text" value={employee_id} onChange={(e)=>setEmployee_id(e.target.value)}/></div>
                <div>Name</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="text" value={name} onChange={(e)=>setName(e.target.value)}/></div>
                <div>Email</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/></div>
                <div>Mobile No.</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="tel" pattern='[0-9]{10}' value={mobile} onChange={(e)=>setMobile(e.target.value)}/></div>
                <div>Designation</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="text" value={designation} onChange={(e)=>setDesignation(e.target.value)}/></div>
                <div>Gender</div>
                <div style={{margin: '5px 0 15px 0'}}><span>M</span><input type="radio" name='gender' value='M' checked={gender === 'M'} onChange={(e)=>setGender(e.target.value)}/><span style={{margin: '0 0 0 15px'}}>F</span><input type="radio" name='gender' value='F' checked={gender === 'F'} onChange={(e)=>setGender(e.target.value)}/></div>
                <div>Course</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="text" value={course} onChange={(e)=>setCourse(e.target.value)}/></div>
                <div>Image upload</div>
                <div style={{margin: '5px 0 15px 0'}}><input type="file" accept='image/' name='image' onChange={(e)=>setImage(e.target.files[0])}/></div>
                <div><button style={{margin: '15px', width: '80px'}} onClick={submitHandler}>Submit</button></div>
            </div>
        </div>
    </div>
  )
}

export default AddEmp;
