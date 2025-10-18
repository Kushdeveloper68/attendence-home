const express = require('express');
const AdminRouter = express.Router();
const admintokenCheckMiddleware = require('../middleware/admintokenmiddleware');
const tokenCheckMiddleware = require('../middleware/tokencheckmiddleware');
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware');
const {
  getAllStudents,
  getStudentByEnrollment,
  filterStudents,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controller/admincontrol');
const {
  getAllTeachers,
  getTeacherByUniqueId,
  filterTeachersByBranch,
  createTeacher,
  updateTeacher,
  deleteTeacher
} = require('../controller/admincontrol');

const {
  getAttendanceByEnrollment,
  filterAttendance,
  getAllAttendance
} = require('../controller/admincontrol');

const {
  getStudentCounts,
  getTeacherCounts,
  getTeacherReports,
  getStudentReports,
  deleteTeacherReport,
  deleteStudentReport
} = require('../controller/admincontrol');


// Apply admin token check middleware to all admin routes
AdminRouter.use(admintokenCheckMiddleware);



AdminRouter.get('/students', getAllStudents)
AdminRouter.get('/students/search', getStudentByEnrollment);
AdminRouter.get('/students/filter', filterStudents);
AdminRouter.post('/students', createStudent);
AdminRouter.put('/students/:id', updateStudent);
AdminRouter.delete('/students/:id', deleteStudent);

AdminRouter.get('/teachers', getAllTeachers);
AdminRouter.get('/teachers/search', getTeacherByUniqueId);
AdminRouter.get('/teachers/filter', filterTeachersByBranch);
AdminRouter.post('/teachers', createTeacher);
AdminRouter.put('/teachers/:id', updateTeacher);
AdminRouter.delete('/teachers/:id', deleteTeacher);

AdminRouter.get('/attendance/search', getAttendanceByEnrollment);
AdminRouter.get('/attendance/filter', filterAttendance);
AdminRouter.get('/attendance/all', getAllAttendance);

// Summary counts
AdminRouter.get('/dashboard/student-counts', getStudentCounts);
AdminRouter.get('/dashboard/teacher-counts', getTeacherCounts);

// Reports
AdminRouter.get('/dashboard/teacher-reports', getTeacherReports);
AdminRouter.get('/dashboard/student-reports', getStudentReports);

AdminRouter.delete('/dashboard/teacher-reports/:id', deleteTeacherReport);
AdminRouter.delete('/dashboard/student-reports/:id', deleteStudentReport);

module.exports = AdminRouter;
