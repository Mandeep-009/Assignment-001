import express from 'express';
import Admin from '../models/admin.js';

const adminRouter = express.Router();

adminRouter.post('/register',async(req,res)=>{
    try{
        const existingAdmin = await Admin.findOne({ username: req.body.username });
        if (existingAdmin) {
            return res.status(400).send({ message: 'Admin already registered by this email' });
        }
        const newAdmin=await Admin.create(req.body);
        res.status(201).send(newAdmin);
    }catch(err){
        res.status(400).send({message:err.message});
    }
})

adminRouter.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body;
        const admin=await Admin.findOne({username});
        if(!admin){
            return res.status(404).send({message:'No admin registered by this username'});
        }

        if(password!==admin.password){
            return res.status(401).send({message:'password invalid'});
        }

        res.status(200).send({message:'Login successful',admin});

    }catch(err){
        res.status(500).send({message:err.message});
    }
})

export default adminRouter;