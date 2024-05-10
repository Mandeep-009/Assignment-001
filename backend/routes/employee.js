import express from 'express';
import Employee from '../models/employee.js';


const employeeRouter = express.Router();

employeeRouter.get('/all_employees', async (req,res)=>{
    const employees = await Employee.find({});
    res.status(200).send(employees);
});

employeeRouter.post('/new_employee', async (req,res)=>{
    const {email} = req.body;
    const oldEmployee = await Employee.findOne({email});
    if(oldEmployee)
        return res.status(400).send({message: 'some employee already registered by this email'});
    const newEmployee = await Employee.create(req.body);
    return res.status(201).send({message: 'successfully created new employee',newEmployee});
})

export default employeeRouter;