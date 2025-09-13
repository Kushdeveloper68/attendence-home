import React, { useState } from "react";
import "../styles/markattendence.css"
import Navbar from './Navbar';
import Footer from './Footer';
const students = [
  { name: "Sophia Clark", enroll: "2021CS001", present: false },
  { name: "Ethan Carter", enroll: "2021CS002", present: true },
  { name: "Olivia Reed", enroll: "2021CS003", present: false },
  { name: "Liam Hayes", enroll: "2021CS004", present: true },
  { name: "Ava Bennett", enroll: "2021CS005", present: false },
  { name: "Noah Foster", enroll: "2021CS006", present: false },
  { name: "Isabella Wright", enroll: "2021CS007", present: true },
  { name: "Jackson Cole", enroll: "2021CS008", present: false },
];

export default function MarkAttendance() {
  const [attendance, setAttendance] = useState(
    students.map((s) => s.present)
  );

  const handleCheckbox = (idx) => {
    setAttendance((prev) =>
      prev.map((val, i) => (i === idx ? !val : val))
    );
  };

  const handleSubmit = () => {
    // You can send attendance data to backend here
    alert("Attendance submitted!");
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root bg-[var(--gray-100)] text-[var(--navy-900)]">
      <Navbar />
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-3xl font-bold text-[var(--navy-900)] mb-6">Mark Attendance</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8 bg-[var(--teal-50)] p-6 rounded-lg border border-[var(--teal-100)]">
            <div>
              <p className="text-sm font-medium text-[var(--navy-700)]">Branch</p>
              <p className="text-lg font-semibold text-[var(--navy-900)]">Computer Science</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--navy-700)]">Semester</p>
              <p className="text-lg font-semibold text-[var(--navy-900)]">4th</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--navy-700)]">Subject</p>
              <p className="text-lg font-semibold text-[var(--navy-900)]">Data Structures</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-[var(--navy-900)] mb-4">Student List</h3>
            </div>
            <div className="table-container" style={{ maxHeight: "50vh", overflowY: "auto" }}>
              <table className="w-full">
                <thead className="bg-[var(--gray-100)] sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-[var(--navy-700)] uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-[var(--navy-700)] uppercase tracking-wider">Enrollment No.</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-[var(--navy-700)] uppercase tracking-wider w-24">Present</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--gray-200)]">
                  {students.map((student, idx) => (
                    <tr key={student.enroll} className="hover:bg-[var(--teal-50)] transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--gray-800)]">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--gray-600)]">{student.enroll}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <input
                          className="h-5 w-5 checkbox-custom focus:ring-2 focus:ring-[var(--teal-500)] focus:ring-offset-2"
                          type="checkbox"
                          checked={attendance[idx]}
                          onChange={() => handleCheckbox(idx)}
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
          className="btn-submit flex items-center gap-2 rounded-full h-14 px-8 bg-[var(--teal-500)] text-white text-base font-bold hover:bg-[var(--teal-600)] transition-all"
          onClick={handleSubmit}
        >
          <span>Submit Attendance</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
     <Footer/>
    </div>
    );
}