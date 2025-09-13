const mongoose = require('mongoose');

const teacherSavedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  branch: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

const TeacherSaved = mongoose.model('TeacherSaved', teacherSavedSchema);

module.exports = TeacherSaved;
