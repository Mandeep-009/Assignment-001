import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT , MONGODB_URL } from "./config.js";
import adminRouter from "./routes/admin.js";
import employeeRouter from "./routes/employee.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth/',adminRouter);
app.use('/api/employees/',employeeRouter);

mongoose
    .connect(MONGODB_URL)
    .then(()=>{
        console.log('server connected to database');
        app.listen(PORT,()=>{
            console.log('server is listening on port: ',PORT)
        })
    })
    .catch((error)=>{
        console.error('An error occured: ', error.message);
    })