const mongoose = require('mongoose');

const studentSavedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  enrollmentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  branch: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  }
});

const StudentSaved = mongoose.model('StudentSaved', studentSavedSchema);

module.exports = StudentSaved;
