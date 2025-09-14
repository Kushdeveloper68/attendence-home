const {handleStudentUser, handleTeacherUser,handleSendOTP, verifyOtpApi} = require('../controller/postcontrol');
const express = require('express');
const postRouter = express.Router();

postRouter.post('/signup/student', handleStudentUser);
postRouter.post('/signup/teacher', handleTeacherUser);
postRouter.post('/send-otp', handleSendOTP);
postRouter.post('/verify-otp', verifyOtpApi);

module.exports = postRouter;