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
    type: String,
    required: true,
    unique: true,
   },
    password: {
    type: String,
    required: true,
  },
  role:{
      type:String,
      required:true
    }
});

const TeacherUser = mongoose.model('Teacher User', teacherUserSchema);

module.exports = TeacherUser;
