require('dotenv').config()
const express = require('express')
const app = express()
const {AdminModel} = require("../model")
const bcrypt = require('bcryptjs')
const {mongodbConnection} = require("../connection/connection")

const adminData = {
    username: "admin",
    email: "admin@example.com",
    password: "123",
    phone: "1234567890"
};

mongodbConnection(process.env.mongoUrl || "mongodb://localhost:27017/Attendence")
  .then(() => console.log('mongodb conneted'))
  .catch(err => console.log('kush mongo err'))


async function createAdmin() {
    try {
        const { username, email, password, phone } = adminData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new AdminModel({ username, email, password: hashedPassword, phone });
        await newAdmin.save();
        console.log({ message: "Admin created successfully", admin: newAdmin });
    } catch (error) {
        console.error({ message: "Error creating admin", error });
    }
}
createAdmin();
