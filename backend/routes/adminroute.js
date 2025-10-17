const express = require('express');
const AdminRouter = express.Router();
const {getAllStudents,getStudentByEnrollment,filterStudents,createStudent,updateStudent,deleteStudent} = require('../controller/admincontrol');
const {
  getAllTeachers,
  getTeacherByUniqueId,
  filterTeachersByBranch,
  createTeacher,
  updateTeacher,
  deleteTeacher
} = require('../controller/admincontrol');

AdminRouter.get('/students', getAllStudents);
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


module.exports = AdminRouter;
