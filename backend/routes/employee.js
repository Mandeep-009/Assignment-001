import express from 'express';
import Employee from '../models/employee.js';
import upload from "../multer-middleware.js";
import { uploadOnCloudinary } from '../cloudinary.js';

const employeeRouter = express.Router();

employeeRouter.get('/all_employees', async (req,res)=>{
    const employees = await Employee.find({});
    res.status(200).send(employees);
});

employeeRouter.get('/employee/:id', async (req,res)=>{
    const employee = await Employee.findOne({email: req.params.id});
    res.status(200).send(employee);
});

employeeRouter.post('/new_employee', upload.single("image"), async (req,res)=>{
    try {
        const {email} = req.body;
        const oldEmployee = await Employee.findOne({email});
        if(oldEmployee)
            return res.status(400).send({message: 'some employee already registered by this email'});

        const {employee_id,name,mobile,designation,gender,course} = req.body;
        const path = req.file?.path;
        var response = "";
        if(path) {
            response = await uploadOnCloudinary(path)
            console.log(response)
            if(!response) response = "";
        }
        const data = {employee_id,name,mobile,designation,gender,course,email,image: response}
        const newEmployee = await Employee.create(data);
        return res.status(201).send({message: 'successfully created new employee',newEmployee});
    } catch (error) {
        console.log('error: ',error);
        res.status(500).send('an error occured: ',error)
    }
})

employeeRouter.put('/edit_employee/:id', upload.single("image"), async (req,res)=>{
    try {
        const {email} = req.body;
        const {id} = req.params;

        const {employee_id,name,mobile,designation,gender,course} = req.body;

        if(email!==id){
            const oldEmployee = await Employee.findOne({email});
            if(oldEmployee)
                return res.status(400).send({message: 'some employee already registered by this email'});
        }
        const path = req.file?.path;
        var response = "";
        if(path) {
            response = await uploadOnCloudinary(path)
            if(!response) response = "";
        }

        const options = { upsert: true, returnOriginal: false };

        const data1 = {employee_id,name,mobile,designation,gender,course,email,image: response}
        const data2 = {employee_id,name,mobile,designation,gender,course,email}
        if(!response){
            const newEmployee = await Employee.findOneAndUpdate({email:id},{$set:data2},options);
            console.log(data2)
            return res.status(200).send({message: 'successfully updated employee details',newEmployee});
        }
        else{
            const newEmployee = await Employee.findOneAndUpdate({email:id},{$set:data1},options);
            console.log(data1)
            return res.status(200).send({message: 'successfully updated employee details',newEmployee});
        }
    } catch (error) {
        console.log('error: ',error);
        res.send({message: error.message})
    }
})

employeeRouter.delete('/:mail',async (req,res) => {
    try {
        const {mail} = req.params;
        await Employee.deleteOne({email: mail})
        res.status(200).send({message: 'document deleted successfully'})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

export default employeeRouter;