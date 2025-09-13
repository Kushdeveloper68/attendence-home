const {StudentSaved, StudentUser , TeacherSaved , TeacherUser} = require('../model');

async function handleStudentUser(req, res) {
    try {
        const {name , email , password, branch, semester, enrollment, phone} = req.body;
        // Check if user already exists

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function handleTeacherUser(req, res) {
    try {
        const {name , email , branch, password, uniqueid, phone} = req.body;
        // You might want to add validation and hashing for the password here

        // Save the teacher to the database
        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
        console.error('Error registering teacher:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {handleStudentUser, handleTeacherUser};