import React, { useEffect, useState } from 'react'
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employees = () => {
    const [count,setCount] = useState(0);
    const [data,setData] = useState([]);
    const [loaded,setLoaded] = useState(false);
    
    useEffect(()=>{
        const getData = async ()=>{
            const employees = await axios.get('http://localhost:5173/api/employees/all_employees');
            setData(employees.data);
            setLoaded(true);
        }
        getData();
    },[])
  return (
    <div>
      <Logo />
      <Navbar />
      <div style={{display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
        <span style={{margin: '1px 20px'}}>Total: {count}</span>
        <Link to='/add_employee'><button>Create Employee</button></Link>
      </div>
      <div>
        <input type="text" placeholder="Enter search keyword" />
        <button>Search</button>
      </div>
      <br />
      <div style={{display: 'flex', justifyContent: 'space-evenly', fontWeight: 'bold'}}>
        <div>Id</div>
        <div>Image</div>
        <div>Name</div>
        <div>Email</div>
        <div>Mobile No.</div>
        <div>Designation</div>
        <div>Gender</div>
        <div>Course</div>
        <div>Create Date</div>
        <div>Action</div>
      </div>
      {loaded?(data.map((employee,index)=>{
            return (
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <div>{employee.employee_id}</div>
                    <div>no image</div>
                    <div>{employee.name}</div>
                    <div>{employee.email}</div>
                    <div>{employee.mobile}</div>
                    <div>{employee.designation}</div>
                    <div>{employee.gender}</div>
                    <div>{employee.course}</div>
                    <div>{employee.create_date}</div>
                    <div><button>Edit</button><button>Delete</button></div>
                </div>
            )
        })
      ):(null)}
    </div>
  )
}

export default Employees
