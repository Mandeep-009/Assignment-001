import React, { useEffect, useState } from 'react'
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { bakckend_url } from '../config';

const Employees = () => {

    const [count,setCount] = useState(0);
    const [data,setData] = useState([]);
    const [loaded,setLoaded] = useState(false);
    const [query,setQuery] = useState('');
    const [queriedArray,setQueriedArray] = useState([]);
    const [searched,setSearched] = useState(false);
    const [parameter,setParameter] = useState('');

    const deleteEmployee = async (mail) => {
      try {
        const response = await axios.delete(`${bakckend_url}/api/employees/${mail}`)
        alert(response.data.message);
        window.location.reload()
      } catch (error) {
        if(error.response && error.response.data){
          alert(error.response.data.message)
        }
        else{
          console.log(error)
        }
      }
    }

    const searchHandler = () => {
      
      if(!query) return alert('please enter some query to search');
      setQueriedArray([])
      
      for(let i=0;i<count;i++){
        if(data[i].email == query ||
            data[i].name == query ||
            data[i].designation == query ||
            data[i].mobile == query ||
            data[i].employee_id == query
        ){
          setQueriedArray([...queriedArray,data[i]]);
        }
      }
      setTimeout(() => {
        setLoaded(true);
        setSearched(true);
      }, 100);
    
      
    }

    const sortbydate = () => {
      const sortedData = [...data].sort((a, b) => new Date(b.create_date) - new Date(a.create_date));
      setData(sortedData);
    }

    const sortbyname = () => {
      const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
      setData(sortedData);
    }

    const sortbyID = () => {
      const sortedData = [...data].sort((a, b) => a.employee_id - b.employee_id);
      setData(sortedData);
    }

    const handleSort = (e) => {
      e.preventDefault();
      if(parameter == "create_date") {
        sortbydate()
      }
      else if (parameter == "name") {
        sortbyname()
      }
      else if (parameter == "employee_id") {
        sortbyID()
      }
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentItems = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    
    useEffect(()=>{
        const getData = async ()=>{
            const employees = await axios.get(`${bakckend_url}/api/employees/all_employees`);
            setData(employees.data);
            setLoaded(true);
            setCount(employees.data.length)
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
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <div>
          <input type="text" placeholder="Enter search keyword" onChange={(e)=>setQuery(e.target.value)}/>
          <button onClick={searchHandler}>Search</button>
        </div>
        <div>
          <form onSubmit={handleSort}>
            <label htmlFor="sort">Sort By: </label>
            <select id="parameters" name="parameters" value={parameter} onChange={(e)=>setParameter(e.target.value)}>
            <option value="">--Please choose an option--</option>
              <option value="create_date">Create Date</option>
              <option value="name" >Name</option>
              <option value="employee_id" >Employee ID</option>
            </select>
            <input type="submit" value="Apply" />
          </form>
        </div>
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
      {/* <button onClick={sortbydate}>Sort by date created</button>
      <button onClick={sortbyname}>Sort by name</button>
      <button onClick={sortbyID}>Sort by id</button> */}
      <hr />
      {(loaded&&!searched)?(currentItems.map((employee,index)=>{
            return (<div style={{display: 'flex'}}>
                    <div style={{width:'90px'}}>{employee.employee_id}</div>
                    <div style={{width:'100px'}}>
                      {employee.image ? (<img src={employee.image} height={30} width={30}/>):'no image'}
                    </div>
                    <div style={{width:'100px'}}>{employee.name}</div>
                    <div style={{width:'300px'}}>{employee.email}</div>
                    <div style={{width:'100px'}}>{employee.mobile}</div>
                    <div style={{width:'130px'}}>{employee.designation}</div>
                    <div style={{width:'90px'}}>{employee.gender}</div>
                    <div style={{width:'90px'}}>{employee.course}</div>
                    <div style={{width:'130px'}}>{employee.create_date.substring(0,10)}</div>
                    <div style={{width:'90px'}}>
                      <Link to={`/edit_employee/${employee.email}`}><button>Edit</button></Link>
                      <button onClick={()=>deleteEmployee(employee.email)}>Delete</button>
                    </div>
                </div>
            )
        })
      ):(null)}
      {(loaded&&searched)?(queriedArray.map((employee,index)=>{
        return (<div style={{display: 'flex'}}>
                    <div style={{width:'90px'}}>{employee.employee_id}</div>
                    <div style={{width:'100px'}}>
                      {employee.image ? (<img src={employee.image} height={30} width={30}/>):'no image'}
                    </div>
                    <div style={{width:'100px'}}>{employee.name}</div>
                    <div style={{width:'300px'}}>{employee.email}</div>
                    <div style={{width:'100px'}}>{employee.mobile}</div>
                    <div style={{width:'130px'}}>{employee.designation}</div>
                    <div style={{width:'90px'}}>{employee.gender}</div>
                    <div style={{width:'90px'}}>{employee.course}</div>
                    <div style={{width:'130px'}}>{employee.create_date.substring(0,10)}</div>
                    <div style={{width:'90px'}}>
                      <Link to={`/edit_employee/${employee.email}`}><button>Edit</button></Link>
                      <button onClick={()=>deleteEmployee(employee.email)}>Delete</button>
                    </div>
                </div>
        )
      })):(null)}
      {loaded&&!searched&&<div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>}
    </div>
  )
}

export default Employees
