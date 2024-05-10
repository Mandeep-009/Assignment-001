import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import AddEmp from './pages/AddEmp';
import EditEmp from './pages/EditEmp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/employees' element={<Employees/>}/>
          <Route path='/add_employee' element={<AddEmp/>}/>
          <Route path='/edit_employee' element={<EditEmp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
