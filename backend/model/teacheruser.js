const mongoose = require('mongoose');

const teacherUserSchema = new mongoose.Schema({
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
    stype: String,
    required: true,
    unique: true,
   },
    password: {
    type: String,
    required: true,
  },
});

const TeacherUser = mongoose.model('TeacherUser', teacherUserSchema);

module.exports = TeacherUser;
