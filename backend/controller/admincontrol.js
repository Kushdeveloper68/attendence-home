// controllers/adminControl.js

const {StudentSaved} = require('../model/'); // Your student schema
const {TeacherSaved} = require('../model/'); 
// GET all students
 async function getAllStudents(req, res)  {
  try {
    const students = await StudentSaved.find({});
    res.json({ students });
  } catch (error) {
    res.json({ error: 'Failed to fetch students.' });
  }
};

// GET student by enrollment number (search)
async function getStudentByEnrollment(req, res) {
  const { enrollmentNumber } = req.query;
  try {
    const student = await StudentSaved.findOne({ enrollmentNumber });
    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }
    res.json({ student });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student.' });
  }
};

// GET filter by branch and semester
async function filterStudents(req, res) {
  const { branch, semester } = req.query;
  try {
    const students = await StudentSaved.find({
      branch,
      semester,
    });
    res.json({ students });
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter students.' });
  }
};

// POST create new student
async function createStudent(req, res) {
  const { name, email, enrollmentNumber, branch, semester, phone } = req.body;
  try {
    const exists = await StudentSaved.findOne({ $or: [{ email }, { enrollmentNumber }, { phone }] });
    if (exists) return res.status(400).json({ error: 'Student with provided detail exists.' });
    const student = new StudentSaved({ name, email, enrollmentNumber, branch, semester, phone });
    await student.save();
    res.status(201).json({ student });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student.' });
  }
};

// PUT update student by ID
async function updateStudent(req, res) {
  const { id } = req.params;
  const { name, email, enrollmentNumber, branch, semester, phone } = req.body;
  try {
    const student = await StudentSaved.findByIdAndUpdate(
      id,
      { name, email, enrollmentNumber, branch, semester, phone },
      { new: true, runValidators: true }
    );
    if (!student) return res.status(404).json({ error: 'Student not found.' });
    res.json({ student });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student.' });
  }
};

// DELETE student by ID
async function deleteStudent(req, res) {
  const { id } = req.params;
  try {
    const student = await StudentSaved.findByIdAndDelete(id);
    if (!student) return res.status(404).json({ error: 'Student not found.' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student.' });
  }
};



// Your teacher schema

// GET all teachers
async function getAllTeachers(req, res) {
  try {
    const teachers = await TeacherSaved.find({});
    res.json({ teachers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teachers.' });
  }
};

// GET teacher by unique ID (search)
async function getTeacherByUniqueId(req, res) {
  const { uniqueId } = req.query;
  try {
    const teacher = await TeacherSaved.findOne({ uniqueId });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found.' });
    }
    res.json({ teacher });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teacher.' });
  }
};

// GET filter by branch
async function filterTeachersByBranch(req, res) {
  const { branch } = req.query;
  try {
    const teachers = await TeacherSaved.find({ branch });
    res.json({ teachers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter teachers.' });
  }
};

// POST create new teacher
async function createTeacher(req, res) {
  const { name, email, uniqueId, branch, phone } = req.body;
  try {
    const exists = await TeacherSaved.findOne({ 
      $or: [{ email }, { uniqueId }, { phone }] 
    });
    if (exists) {
      return res.status(400).json({ error: 'Teacher with provided detail already exists.' });
    }
    const teacher = new TeacherSaved({ name, email, uniqueId, branch, phone });
    await teacher.save();
    res.status(201).json({ teacher });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create teacher.' });
  }
};

// PUT update teacher by ID
async function updateTeacher(req, res) {
  const { id } = req.params;
  const { name, email, uniqueId, branch, phone } = req.body;
  try {
    const teacher = await TeacherSaved.findByIdAndUpdate(
      id,
      { name, email, uniqueId, branch, phone },
      { new: true, runValidators: true }
    );
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found.' });
    }
    res.json({ teacher });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update teacher.' });
  }
};

// DELETE teacher by ID
  async function deleteTeacher(req, res)  {
  const { id } = req.params;
  try {
    const teacher = await TeacherSaved.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found.' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete teacher.' });
  }
};




module.exports = {
  getAllStudents,
  getStudentByEnrollment,
    filterStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    
    getAllTeachers,
    getTeacherByUniqueId,
    filterTeachersByBranch,
    createTeacher,
    updateTeacher,
    deleteTeacher

};