const TeacherUser = require("./teacheruser");
const  StudentUser = require('./studentuser');
const StudentSaved = require('./studentsaved');
const TeacherSaved = require('./teachersaved');
const  AttendenceSchema = require('./attendencesaved'); 
const StudentReport = require("./studentReport");
const TeacherReport = require("./teacherReport");
module.exports = { TeacherUser, StudentUser , TeacherSaved, StudentSaved, AttendenceSchema, StudentReport, TeacherReport };
