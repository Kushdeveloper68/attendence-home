const {
  handleStudentUser,
  handleTeacherUser,
  handleSendOTP,
  verifyOtpApi,
  handleUserLogin,
  handleGenerateQR,
  handleScanQR,
  handleStudentAttendance
} = require('../controller/postcontrol');
const ipInfoMiddleware = require('../middleware/ipinfomiddleware');
const tokenCheckMiddleware = require('../middleware/tokencheckmiddleware');
const express = require('express');
const postRouter = express.Router();

postRouter.post('/signup/student', handleStudentUser);
postRouter.post('/signup/teacher', handleTeacherUser);
postRouter.post('/send-otp', handleSendOTP);
postRouter.post('/verify-otp', verifyOtpApi);
postRouter.post('/login', handleUserLogin);
postRouter.post('/generate-qr', tokenCheckMiddleware, handleGenerateQR);
postRouter.post('/scan-qr', tokenCheckMiddleware, handleScanQR);
postRouter.post('/mark-attendance', [ipInfoMiddleware, tokenCheckMiddleware], handleStudentAttendance);

module.exports = postRouter;
