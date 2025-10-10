const mongoose = require('mongoose');

const studentReportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrollmentNumber: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const StudentReport = mongoose.model('Student Report', studentReportSchema);
module.exports = StudentReport;