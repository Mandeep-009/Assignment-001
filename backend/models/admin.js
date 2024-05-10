import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    serialNumber: { type: Number },
    username: { type: String, required: true },
    password: { type: String, required: true }
})

const Admin = mongoose.model('admins',adminSchema);

export default Admin;