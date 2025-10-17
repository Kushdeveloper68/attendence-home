import React, { useEffect, useState } from "react";
import { AdminNavbar } from "./components";
import { useNavigate } from 'react-router-dom';
import {
  getStudentAttendanceApi,
  getAttendanceByFilterApi,
  getAllAttendanceApi
} from '../apis/API';

export default function AttendancePage() {
  const user = localStorage.getItem("student") || localStorage.getItem("teacher")|| localStorage.getItem("admin");
  const token = localStorage.getItem("token");
  const navigator = useNavigate();

  const [parsedUser, setParsedUser] = useState({});
  const [searchEnrollment, setSearchEnrollment] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // For summary stats
  const [summary, setSummary] = useState({ present: 0, absent: 0, total: 0 });

  useEffect(() => {
    if (!user && !token) navigator("/");
    const role = JSON.parse(user)?.role;
    setParsedUser(JSON.parse(user));
    if (role !== "admin") navigator("/");
    fetchAllAttendance();
    // eslint-disable-next-line
  }, []);

  const fetchAllAttendance = async () => {
    setLoading(true);
    setError('');
    try {
      const students = await getAllAttendanceApi();
      setAttendanceList(students);
      calculateSummary(students);
    } catch (err) {
      setError(err);
      setAttendanceList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchEnrollment.trim()) return;
    setLoading(true);
    setError('');
    try {
      const student = await getStudentAttendanceApi(searchEnrollment.trim());
      setAttendanceList(student ? [student] : []);
      calculateSummary([student]);
    } catch (err) {
      setError(err);
      setAttendanceList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    if (!filterBranch || !filterSemester) return;
    setLoading(true);
    setError('');
    try {
      const students = await getAttendanceByFilterApi(filterBranch, filterSemester);
      setAttendanceList(students);
      calculateSummary(students);
    } catch (err) {
      setError(err);
      setAttendanceList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchEnrollment('');
    setFilterBranch('');
    setFilterSemester('');
    fetchAllAttendance();
  };

  // Attendance summary calculation
  const calculateSummary = (students) => {
    let present = 0, absent = 0, total = 0;
    students.forEach(student =>
      student.attendance.forEach(entry => {
        if(entry.status === "Present") present++;
        if(entry.status === "Absent") absent++;
        total++;
      })
    );
    setSummary({ present, absent, total });
  };

  // For front-end progress circle (percent present)
  const percentPresent = summary.total ? Math.round((summary.present / summary.total) * 100) : 0;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f6f7f8", color: "#111921" }}>
      <AdminNavbar/>
      <main className="flex-1">
        <header className="flex items-center justify-between p-6 shadow-md"
                style={{ backgroundColor: "#ffffff" }}>
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-2xl font-bold">Attendance Records</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full transition-colors" style={{ backgroundColor: "transparent" }}>
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full"
                    style={{ backgroundColor: "#ef4444" }}></span>
            </button>
            <div className="flex items-center gap-3">
              <img
                alt="Admin"
                className="size-10 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK5bF0oOFTinmuFjDNz9fkuRuiXmN4moZTgBRFBHN4CKXjoh9F8w1OiAEiwGwKIhPeN3ivRKVd9Oz8jkFWgbxaCHdJHY4DQuMb8dLb0l9TVRhHNgb_-53Q0QK7UwASk756bc7HPIUgQphU0WtUmtvnVMBp7E8QLP3XmMNr7M3uWO-he338G2FLaDzgDPs6Jx98kmrrVTH_m_L6Oe8HNT8udCG0WDO4pmOjKBr3pmIlBITnZBzo41At4eYMg8dFlaZ8vhG2oBDPaP4"
              />
              <div>
                <p className="font-semibold">Admin User</p>
                <p style={{ color: "#6b7280" }}>admin@ams.com</p>
              </div>
            </div>
            <button className="p-2 rounded-full transition-colors" style={{ backgroundColor: "transparent" }}>
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </header>

        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex gap-2 items-center w-full md:max-w-lg">
              <div className="relative w-full">
                <span style={{ color: "#6b7280" }} className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2">
                  search
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3 rounded-lg focus:ring-2 transition"
                  style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", color: "#111921" }}
                  placeholder="Search by Enrollment No"
                  type="text"
                  value={searchEnrollment}
                  onChange={e => setSearchEnrollment(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button className="px-4 py-3 rounded-lg bg-[#197fe6] text-white font-medium"
                      onClick={handleSearch}>
                Find
              </button>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="px-2 py-3 border border-gray-200 rounded-lg bg-white mr-2"
                value={filterBranch}
                onChange={e => setFilterBranch(e.target.value)}
              >
                <option value="">Branch</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
              </select>
              <select
                className="px-2 py-3 border border-gray-200 rounded-lg bg-white"
                value={filterSemester}
                onChange={e => setFilterSemester(e.target.value)}
              >
                <option value="">Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              <button className="px-4 py-3 rounded-lg bg-[#197fe6] text-white font-medium"
                      onClick={handleFilter}>
                Filter
              </button>
              <button className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium border border-gray-200 ml-2"
                      onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>

          {/* Error & Loading */}
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {loading && <div className="mb-4 text-blue-400">Loading...</div>}

          {/* Attendance Table */}
          <div className="rounded-lg shadow-md overflow-x-auto" style={{ backgroundColor: "#ffffff" }}>
            <table className="w-full text-left">
              <thead style={{ borderBottom: "1px solid #e5e7eb" }}>
                <tr>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Enrollment</th>
                  <th className="p-4 font-semibold">Branch</th>
                  <th className="p-4 font-semibold">Semester</th>
                  <th className="p-4 font-semibold">Attendance Details</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-400">No attendance data found.</td>
                  </tr>
                ) : (
                  attendanceList.map(stu => (
                    <tr key={stu.enrollmentNumber} style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td className="p-4">{stu.name}</td>
                      <td className="p-4">{stu.email}</td>
                      <td className="p-4">{stu.enrollmentNumber}</td>
                      <td className="p-4">{stu.branch}</td>
                      <td className="p-4">{stu.semester}</td>
                      <td className="p-4">
                        <div className="max-h-48 overflow-y-auto rounded border border-gray-100 p-2 bg-gray-50">
                          {stu.attendance.length === 0 ? (
                            <p className="text-gray-400 text-sm">No records found.</p>
                          ) : (
                            <table className="min-w-full text-xs">
                              <thead>
                                <tr>
                                  <th className="px-2 py-1">Subject</th>
                                  <th className="px-2 py-1">Teacher</th>
                                  <th className="px-2 py-1">Date</th>
                                  <th className="px-2 py-1">Status</th>
                                  <th className="px-2 py-1">IP</th>
                                </tr>
                              </thead>
                              <tbody>
                                {stu.attendance.map((a, idx) => (
                                  <tr key={idx}>
                                    <td className="px-2 py-1">{a.subject}</td>
                                    <td className="px-2 py-1">{a.teacherName}</td>
                                    <td className="px-2 py-1">{new Date(a.date).toLocaleDateString()}</td>
                                    <td className="px-2 py-1">
                                      <span className={`px-2 py-1 rounded-full font-semibold ${a.status === "Present" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                        {a.status}
                                      </span>
                                    </td>
                                    <td className="px-2 py-1">{a.ip}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Attendance Summary */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Attendance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Present", value: `${percentPresent}%`, color: "#10b981" },
                { label: "Absent", value: `${summary.absent} days`, color: "#ef4444" },
                { label: "Total", value: `${summary.total}`, color: "#111921" },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg shadow-md"
                  style={{ backgroundColor: "#fff", color: card.color }}
                >
                  <p style={{ color: "#6b7280" }}>{card.label}</p>
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
                </div>
              ))}

              {/* Circular Progress */}
              <div className="p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                <div className="relative" style={{ width: "128px", height: "128px" }}>
                  <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%" }}>
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(239,68,68,0.3)"
                      strokeWidth="4"
                    ></path>
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      strokeDasharray={`${percentPresent}, 100`}
                      strokeLinecap="round"
                      strokeWidth="4"
                    ></path>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{percentPresent}%</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span style={{ backgroundColor: "#10b981", width: "12px", height: "12px", borderRadius: "50%" }}></span>
                    <span>Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ backgroundColor: "#ef4444", width: "12px", height: "12px", borderRadius: "50%" }}></span>
                    <span>Absent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
