import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/markattendence.css';
import { markAttendanceApi } from "../apis/API";

export default function MarkAttendance() {
  const user = localStorage.getItem("student") || localStorage.getItem("teacher");
  const token = localStorage.getItem("token");
  const [parsedUser, setParsedUser] = useState({});
  const navigator = useNavigate();
  const location = useLocation();
  const { students = [], branch, semester, subject , teacherName, expires } = location.state || {};

  // Track attendance for each student (default: false)
  const [attendance, setAttendance] = useState(
    students.map(() => false)
  );

  useEffect(() => {
    if (!user && !token) navigator("/");
    const role = JSON.parse(user)?.role;
    setParsedUser(JSON.parse(user));
    if (role !== "student") {
      navigator("/");
    }
  }, [user, token, navigator]);

  const handleCheckbox = (idx) => {
    setAttendance((prev) =>
      prev.map((val, i) => (i === idx ? !val : val))
    );
  };

  const handleSubmit = async () => {
    // Find the index of the checked student
    const idx = attendance.findIndex(val => val);
    if (idx === -1) {
      alert("Please mark your attendance by checking your name.");
      return;
    }

    const markedStudent = students[idx];
    // Check that the logged-in user's enrollment number matches the marked student
    if (parsedUser.enrollmentNumber !== markedStudent.enrollmentNumber) {
      alert("You can only mark your own attendance.");
      return;
    }

    // Prepare attendance data
    const attendanceData = {
      enrollmentNumber: markedStudent.enrollmentNumber,
      subject,
      teacherName: teacherName, // If you have teacherName, pass it here
      status: "Present",
       expires
    };
       console.log(attendanceData);
    try {
      const response = await markAttendanceApi(attendanceData);
      alert(
        response.message
          ? `${response.message} (${markedStudent.enrollmentNumber})`
          : `Attendance submitted (${markedStudent.enrollmentNumber})`
      );
      navigator("/studentdashboard");
    } catch (error) {
      alert("Error submitting attendance.");
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-100 text-navy-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-6">Mark Attendance</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8 bg-teal-50 p-6 rounded-lg border border-teal-100">
            <div>
              <p className="text-sm font-medium text-navy-700">Branch</p>
              <p className="text-lg font-semibold text-navy-900">{branch}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-navy-700">Semester</p>
              <p className="text-lg font-semibold text-navy-900">{semester}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-navy-700">Subject</p>
              <p className="text-lg font-semibold text-navy-900">{subject}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Student List</h3>
            </div>
            <div className="table-container" style={{ maxHeight: "50vh", overflowY: "auto" }}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase">Enrollment No.</th>
                    <th className="px-6 py-3 text-center text-xs font-bold uppercase w-24">Present</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, idx) => (
                    <tr key={student.enrollmentNumber}>
                      <td className="px-6 py-4">{student.name}</td>
                      <td className="px-6 py-4">{student.enrollmentNumber}</td>
                      <td className="px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={attendance[idx]}
                          onChange={() => handleCheckbox(idx)}
                          disabled={attendance.some((val, i) => i !== idx && val)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <div className="flex justify-end px-6 pb-6">
        <button
          className="btn-submit flex items-center gap-2 rounded-full h-14 px-8 bg-teal-500 text-white font-bold hover:bg-teal-600 transition-all"
          onClick={handleSubmit}
        >
          <span>Submit Attendance</span>
        </button>
      </div>
      <Footer />
    </div>
  );
}