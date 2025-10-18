const mongoose = require('mongoose');

const teacherReportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  problem: { type: String, required: true },
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
});
const TeacherReport = mongoose.model('Teacher Report', teacherReportSchema);
module.exports = TeacherReport;