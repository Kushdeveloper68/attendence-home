const {
  StudentSaved,
  StudentUser,
  TeacherSaved,
  TeacherUser
} = require('../model')
const QRCode = require('qrcode');
const fs = require('fs');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const key = process.env.SECRETJSONKEY || 'kush123'
const multer = require('multer')

let otpStore = {}
async function handleSendOTP (req, res) {
  const { email } = req.body

  if (!email) return res.json({ message: 'Email required' })
  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  // Save OTP for verification (expires in 5 min)
  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }
  // Send email
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL, // your gmail
        pass: process.env.PASS // your app password
      }
    })

    await transporter.sendMail({
      from: `"Attendence Home" <${process.env.EMAIL}>`,
      to: email,
      subject: '🔐 Your One-Time Password (OTP)',
      text: `Hello,

                 Your One-Time Password (OTP) is: ${otp}

                  Please use this code to complete your verification. This code is valid for the next 10 minutes.
  
                 If you did not request this, please ignore this email.

                Best regards,
                Worker Manager Team`,
      html: `
               <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
                  <h2 style="color: #333;">Hello,</h2>
                  <p style="font-size: 16px;">Your One-Time Password (OTP) is:</p>
                  <p style="font-size: 24px; font-weight: bold; color: #007BFF;">${otp}</p>
                  <p style="font-size: 14px; color: #555;">
                  Please use this code to complete your verification. This code is valid for the next <strong>10 minutes</strong>.
                  </p>
                  <p style="font-size: 14px; color: #999;">
                  If you did not request this, please ignore this email.
                  </p>
                  <hr style="margin-top: 30px;">
                 <p style="font-size: 12px; color: #aaa;">Worker Manager Team</p>
              </div>
             `
    })

    res.json({ success: true, message: 'OTP sent to email' })
  } catch (err) {
    console.log('OTP email error', err)
    res.json({ success: false, message: 'Failed to send OTP' })
  }
}

async function verifyOtpApi (req, res) {
  const { email, otp } = req.body
  const storedOtp = otpStore[email]
  try {
    if (!storedOtp)
      return res.json({ success: false, message: 'OTP not found or expired' })

    if (storedOtp.otp === otp) {
      delete otpStore[email] // OTP verified, remove from store
      return res.json({ success: true , message: 'OTP verified successfully' })
    } else {
      return res.json({ success: false, message: 'Invalid OTP' })
    }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}



async function handleStudentUser(req, res) {
  try {
    const { name, email, branch, password, semester, enrollment, phone, role } =
      req.body
    // You might want to add validation and hashing for the password here
    const existingStudentUser = await StudentUser.findOne({
      $or: [{ email }, { enrollmentNumber: enrollment }, { phone }]
    })
    if (existingStudentUser) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already registered' })
    }
    // find student in the student saved database by thier enrollement number
    console.log('Checking enrollment number:', enrollment)
    const existingStudent = await StudentSaved.findOne({
      email,
      branch,
      semester,
      enrollmentNumber: enrollment
    })
    if (!existingStudent)
      return res.json({
        success: false,
        message: 'Enrollment number not found in records'
      })

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newStudent = await StudentUser.create({
      name,
      email,
      branch,
      password: hashedPassword,
      enrollmentNumber: enrollment,
      semester,
      phone,
      role
    })
    if (!newStudent)
      return res
        .status(500)
        .json({ success: false, message: 'Failed to register student' })
    // create and send jwt token to frontend
    const token = jwt.sign({ user: newStudent, role: newStudent.role }, key, {
      expiresIn: '7d'
    })
    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      user: {
        name: newStudent.name,
        email: newStudent.email,
        branch: newStudent.branch,
        semester: newStudent.semester,
        enrollmentNumber: newStudent.enrollmentNumber,
        role:newStudent.role
      },
      token
    })
  } catch (error) {
    console.error('Error registering student:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


async function handleTeacherUser (req, res) {
  try {
    const { name, email, branch, password, uniqueid, phone ,role } = req.body
    console.log(req.body)
    // You might want to add validation and hashing for the password here
    const existingTeacherUser = await TeacherUser.findOne({
        $or: [{email }, { uniqueid  }, { phone }]
    })
    if(existingTeacherUser) { 
      return res.json({ success: false, message: 'Email or Unique ID or Phone already registered' })
    }

    
    // find teacher in the teacher saved database by thier uniqueid number
    const existingTeacher = await TeacherSaved.findOne({ 
     uniqueId: uniqueid,
     })

    if (!existingTeacher){
      return res.json({ success: false, message: 'Unique ID not found in records' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    // create teacher user
    const newTeacher = await TeacherUser.create({
      name,
      email,
      branch,
      password: hashedPassword,
     uniqueId: uniqueid,
      phone,
      role
    })
    // check user
    if (!newTeacher)
      return res.json({ success: false, message: 'Failed to register teacher' })
    const token = jwt.sign({ user: newTeacher, role: newTeacher.role }, key, {
      expiresIn: '7d'
    })

    res.status(201).json({
      success: true,
      message: 'Teacher registered successfully',
      user: {
        name: newTeacher.name,
        email: newTeacher.email,
        branch: newTeacher.branch,
        uniqueid: newTeacher.uniqueId,
        phone: newTeacher.phone,
        role: newTeacher.role
      },
      token
    })
  } catch (error) {
    console.error('Error registering teacher:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body

    // Find user by email
    if (!email || !password) {
      return res.json({ success: false, message: 'Email and password are required' })
    }
    // Check in both StudentUser and TeacherUser collections
    let user = await StudentUser.findOne({ email })
    if (!user) {
      user = await TeacherUser.findOne({ email })
    }
    if (!user) {
      return res.json({ success: false, message: 'Invalid email or password' })
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid email or password' })
    }

    // Create and send JWT token
    const token = jwt.sign({ user: user, role: user.role }, key, {
      expiresIn: '7d'
    })

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user: {
        name: user.name,
        branch: user.branch,
        semester: user.semester? user.semester : null,
        enrollmentNumber: user.enrollmentNumber? user.enrollmentNumber : null,
        uniqueid: user.uniqueid? user.uniqueid : null,
        phone: user.phone,
        email: user.email,
        role: user.role
      },
      token
    })
  } catch (error) {
    console.error('Error logging in user:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


async function handleGenerateOR(req , res) {

// Hardcoded JSON data
const userData = {
  name: "Kush Pandit",
  email: "kush@example.com",
  password: "123456"
};

// Convert JSON to string
const qrData = JSON.stringify(userData);

// File name to save
const filePath = __dirname + "/userQR.png";

// Generate QR and save
QRCode.toFile(
  filePath,
  qrData,
  {
    color: {
      dark: "#000000",  // QR code color
      light: "#ffffff"  // background
    },
    width: 300, // image size
  },
  (err) => {
    if (err) {
      console.error("❌ Error generating QR:", err);
    } else {
      console.log("✅ QR Code generated and saved at:", filePath);
    }
  }
);

}
module.exports = {
  handleStudentUser,
  handleTeacherUser,
  handleSendOTP,
  verifyOtpApi,
  handleUserLogin
}
