const mongoose = require("mongoose");

// Attendance sub-schema
const attendanceEntrySchema = new mongoose.Schema({
  subject: { type: String, required: true },
  teacherName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Absent"
  },
  expires: { type:Number, required: true }
});

// Student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  enrollmentNumber: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  semester: { type: String, required: true },

  // Attendance history stored here
  attendance: [attendanceEntrySchema]
});

// Export model
const AttendenceSchema = mongoose.model("Students Attendance", studentSchema);
module.exports = AttendenceSchema;