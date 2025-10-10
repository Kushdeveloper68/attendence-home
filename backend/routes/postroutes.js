const {
  handleStudentUser,
  handleTeacherUser,
  handleSendOTP,
  verifyOtpApi,
  handleUserLogin,
  handleGenerateQR,
  handleScanQR,
  handleStudentAttendance,
  handleStudentReport,
  handleTeacherReport,
} = require('../controller/postcontrol');
const ipInfoMiddleware = require('../middleware/ipinfomiddleware');
const tokenCheckMiddleware = require('../middleware/tokencheckmiddleware');
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware');
const express = require('express');
const postRouter = express.Router();

postRouter.post('/signup/student', handleStudentUser);
postRouter.post('/signup/teacher', handleTeacherUser);
postRouter.post('/send-otp', handleSendOTP);
postRouter.post('/verify-otp', verifyOtpApi);
postRouter.post('/login', handleUserLogin);
postRouter.post('/generate-qr', [tokenCheckMiddleware, roleCheckMiddleware("teacher")], handleGenerateQR);
postRouter.post('/scan-qr', tokenCheckMiddleware, handleScanQR);
postRouter.post('/mark-attendance', [ipInfoMiddleware, tokenCheckMiddleware, roleCheckMiddleware("student")], handleStudentAttendance);

postRouter.post('/student-report', [tokenCheckMiddleware,roleCheckMiddleware("student")], handleStudentReport);
postRouter.post('/teacher-report', [tokenCheckMiddleware,roleCheckMiddleware("teacher")], handleTeacherReport);

module.exports = postRouter;
