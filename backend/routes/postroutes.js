const {handleStudentUser, handleTeacherUser,handleSendOTP, verifyOtpApi , handleUserLogin} = require('../controller/postcontrol');
const express = require('express');
const postRouter = express.Router();

postRouter.post('/signup/student', handleStudentUser);
postRouter.post('/signup/teacher', handleTeacherUser);
postRouter.post('/send-otp', handleSendOTP);
postRouter.post('/verify-otp', verifyOtpApi);
postRouter.post('/login', handleUserLogin);
module.exports = postRouter;