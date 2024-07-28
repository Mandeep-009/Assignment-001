import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employee_id: { type: String, required: true},
    name: { type: String, required: true},
    email: { type: String, required: true},
    mobile: { type: Number, required: true},
    designation: { type: String, required: true},
    gender: { type: String, required: true},
    course: { type: String, required: true},
    create_date: { type: Date, default: Date.now},
    image: { type: String, default: "" }
})

const Employee = mongoose.model('employees',employeeSchema);

export default Employee;