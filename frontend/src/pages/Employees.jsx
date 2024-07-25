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
            setCount(data.length)
        }
        getData();
    },[])
  return (
    <div>
      <Logo />
      <Navbar />
      <div style={{display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
        <span style={{margin: '1px 20px'}}>Total Count: {count}</span>
        <Link to='/add_employee'><button>Create Employee</button></Link>
      </div>
      <div>
        <input type="text" placeholder="Enter search keyword" />
        <button>Search</button>
      </div>
      <br />
      <div style={{display: 'flex', fontWeight: 'bold'}}>
        <div style={{width:'90px'}}>Id</div>
        <div style={{width:'100px'}}>Image</div>
        <div style={{width:'100px'}}>Name</div>
        <div style={{width:'300px'}}>Email</div>
        <div style={{width:'100px'}}>Mobile No.</div>
        <div style={{width:'130px'}}>Designation</div>
        <div style={{width:'90px'}}>Gender</div>
        <div style={{width:'90px'}}>Course</div>
        <div style={{width:'130px'}}>Create Date</div>
        <div style={{width:'90px'}}>Action</div>
      </div>
      <hr />
      {loaded?(data.map((employee,index)=>{
            return (
                <div style={{display: 'flex'}}>
                    <div style={{width:'90px'}}>{employee.employee_id}</div>
                    <div style={{width:'100px'}}>no image</div>
                    <div style={{width:'100px'}}>{employee.name}</div>
                    <div style={{width:'300px'}}>{employee.email}</div>
                    <div style={{width:'100px'}}>{employee.mobile}</div>
                    <div style={{width:'130px'}}>{employee.designation}</div>
                    <div style={{width:'90px'}}>{employee.gender}</div>
                    <div style={{width:'90px'}}>{employee.course}</div>
                    <div style={{width:'130px'}}>{employee.create_date.substring(0,10)}</div>
                    <div style={{width:'90px'}}><button>Edit</button><button>Delete</button></div>
                </div>
            )
        })
      ):(null)}
    </div>
  )
}

export default Employees
