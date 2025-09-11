import React, { useState } from "react";
import "../styles/markattendence.css"
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
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-[var(--teal-500)]">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.07V15H8v-2h3v-2.07c0-1.39.73-2.64 1.93-3.26C13.56 7.34 14.28 7 15 7v2h-1c-.55 0-1 .45-1 1v2h2l-.5 2h-1.5v2.07C10.97 16.64 9.17 15.65 9 17.07zm4-10.07h2v2h-2v-2z"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[var(--navy-900)]">EduTrack</h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-[var(--gray-600)] hover:text-[var(--teal-500)] transition-colors" href="#">Dashboard</a>
            <a className="text-sm font-medium text-[var(--gray-600)] hover:text-[var(--teal-500)] transition-colors" href="#">Courses</a>
            <a className="text-sm font-bold text-[var(--teal-500)]" href="#">Attendance</a>
            <a className="text-sm font-medium text-[var(--gray-600)] hover:text-[var(--teal-500)] transition-colors" href="#">Profile</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-[var(--gray-600)] hover:text-[var(--teal-500)] transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[var(--orange-500)]"></span>
            </button>
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_yZZqcs5hvU9zEFaHwfgqfiRS787HaD1rIKXTN_IpsY7KDZG3ntmnC9WvUE9BeTtpaJpSDoiNmiwfViUHhfwwXWgH7C-18SrylKN6hWvorEIBRcBpNTkNSR_slhBjFWGvY7ZDIxmaXwC997qg26-CFV1Kidly_2TtlU3vsQpSG6pdhZh2AbdGBbCQh32glGZEmWchnmXr4Fp_F_IlnrRalfcVflKfTp8CsE_YqIl6y6i8i6G9GQMfjYyyvfjZTGOCqffsiZwEdQ")',
              }}
            ></div>
          </div>
        </nav>
      </header>
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
      <footer className="bg-white mt-auto">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-[var(--gray-600)]">
          © 2024 EduTrack. All Rights Reserved.
        </div>
      </footer>
    </div>
    );
}