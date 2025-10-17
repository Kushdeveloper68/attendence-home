import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from './components';
import {
  getStudentCountsApi,
  getTeacherCountsApi,
  getTeacherReportsApi,
  getStudentReportsApi,
  deleteTeacherReportApi,
  deleteStudentReportApi,
} from '../apis/API';

export default function AdminDashboard() {
  const user = localStorage.getItem("student") || localStorage.getItem("teacher") || localStorage.getItem("admin");
  const token = localStorage.getItem("token");
  const navigator = useNavigate();

  const [parsedUser, setParsedUser] = useState({});
  const [studentCounts, setStudentCounts] = useState([]);
  const [teacherCounts, setTeacherCounts] = useState([]);

  const [teacherReports, setTeacherReports] = useState([]);
  const [studentReports, setStudentReports] = useState([]);

  const [teacherReportSearch, setTeacherReportSearch] = useState('');
  const [studentReportSearch, setStudentReportSearch] = useState('');

  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!user && !token) navigator("/");
    const role = JSON.parse(user)?.role;
    setParsedUser(JSON.parse(user));
    if (role !== "admin") navigator("/");

    fetchCounts();
    fetchReports();
    // eslint-disable-next-line
  }, []);

  // Fetch summary counts
  async function fetchCounts() {
    setLoading(true);
    try {
      const [students, teachers] = await Promise.all([
        getStudentCountsApi(),
        getTeacherCountsApi(),
      ]);
      setStudentCounts(students);
      setTeacherCounts(teachers);
    } catch {}
    setLoading(false);
  }

  // Fetch reports
  async function fetchReports() {
    setReportLoading(true);
    try {
      const trs = await getTeacherReportsApi();
      const srs = await getStudentReportsApi();
      setTeacherReports(trs);
      setStudentReports(srs);
    } catch {}
    setReportLoading(false);
  }

  // Search/Filter for teacher reports by uniqueId
  async function handleTeacherReportSearch(e) {
    e.preventDefault();
    setReportLoading(true);
    const trs = await getTeacherReportsApi(teacherReportSearch.trim());
    setTeacherReports(trs);
    setReportLoading(false);
  }

  // Search/Filter for student reports by enrollment
  async function handleStudentReportSearch(e) {
    e.preventDefault();
    setReportLoading(true);
    const srs = await getStudentReportsApi(studentReportSearch.trim());
    setStudentReports(srs);
    setReportLoading(false);
  }

  // Delete teacher report
  async function handleDeleteTeacherReport(id) {
    if (!window.confirm("Delete this teacher report?")) return;
    await deleteTeacherReportApi(id);
    setSuccessMsg("Teacher report deleted");
    fetchReports();
    setTimeout(() => setSuccessMsg(''), 2000);
  }
  // Delete student report
  async function handleDeleteStudentReport(id) {
    if (!window.confirm("Delete this student report?")) return;
    await deleteStudentReportApi(id);
    setSuccessMsg("Student report deleted");
    fetchReports();
    setTimeout(() => setSuccessMsg(''), 2000);
  }

  return (
    <div className="flex min-h-screen font-[Inter,sans-serif] bg-[#f6f7f8] dark:bg-[#111921] text-[#111827] dark:text-[#f9fafb]">
      {/* Sidebar */}
      <AdminNavbar />
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#111827] dark:text-[#f9fafb]">
            Dashboard
          </h2>
          <div className="flex items-center space-x-4">
            <p className="font-semibold">Admin</p>
            <div className="w-10 h-10 rounded-full bg-[#197fe6] flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Success Message */}
        {successMsg && (
          <div className="mb-4 p-3 bg-green-500 text-white rounded">{successMsg}</div>
        )}

        {/* Summary Cards (Total and branch table) */}
        {(loading || !studentCounts.length || !teacherCounts.length) ? (
          <div className="mb-8">Loading summary...</div>
        ) : (
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-bold mb-3">Students by Branch and Semester</h3>
              <table className="table-auto w-full bg-white rounded">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Branch</th>
                    <th className="px-4 py-2">Semester</th>
                    <th className="px-4 py-2">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {studentCounts.map((item, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2">{item._id.branch}</td>
                      <td className="px-4 py-2">{item._id.semester}</td>
                      <td className="px-4 py-2 font-bold">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Teachers by Branch</h3>
              <table className="table-auto w-full bg-white rounded">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Branch</th>
                    <th className="px-4 py-2">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherCounts.map((item, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2">{item._id}</td>
                      <td className="px-4 py-2 font-bold">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports: Teacher and Student */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">

          <div className="bg-[#fff] dark:bg-[#1f2937] rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Teacher Problem Reports</h3>
            <form className="flex mb-4 gap-2" onSubmit={handleTeacherReportSearch}>
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Filter by Unique ID"
                value={teacherReportSearch}
                onChange={e => setTeacherReportSearch(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 bg-[#197fe6] text-white rounded font-semibold">Search</button>
              <button
                type="button"
                className="px-4 py-2 ml-2 bg-gray-100 text-gray-700 rounded font-semibold"
                onClick={() => { setTeacherReportSearch(''); fetchReports(); }}
              >Reset</button>
            </form>
            {reportLoading ? <div>Loading...</div> : (
              <table className="table-auto w-full text-[15px]">
                <thead>
                  <tr>
                    <th className="px-2 py-2">Name</th>
                    <th className="px-2 py-2">Email</th>
                    <th className="px-2 py-2">Problem</th>
                    <th className="px-2 py-2">Created At</th>
                    <th className="px-2 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherReports.length === 0 ? (
                    <tr><td colSpan={5} className="p-2 text-sm text-gray-400 text-center">No reports</td></tr>
                  ) : (
                    teacherReports.map((r) => (
                      <tr key={r._id}>
                        <td className="px-2 py-1">{r.name}</td>
                        <td className="px-2 py-1">{r.email}</td>
                        <td className="px-2 py-1">{r.problem}</td>
                        <td className="px-2 py-1">{new Date(r.createdAt).toLocaleString()}</td>
                        <td className="px-2 py-1">
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => handleDeleteTeacherReport(r._id)}
                          >Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-[#fff] dark:bg-[#1f2937] rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Student Reports</h3>
            <form className="flex mb-4 gap-2" onSubmit={handleStudentReportSearch}>
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                placeholder="Filter by Enrollment Number"
                value={studentReportSearch}
                onChange={e => setStudentReportSearch(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 bg-[#197fe6] text-white rounded font-semibold">Search</button>
              <button
                type="button"
                className="px-4 py-2 ml-2 bg-gray-100 text-gray-700 rounded font-semibold"
                onClick={() => { setStudentReportSearch(''); fetchReports(); }}
              >Reset</button>
            </form>
            {reportLoading ? <div>Loading...</div> : (
              <table className="table-auto w-full text-[15px]">
                <thead>
                  <tr>
                    <th className="px-2 py-2">Name</th>
                    <th className="px-2 py-2">Enrollment</th>
                    <th className="px-2 py-2">Semester</th>
                    <th className="px-2 py-2">Subject</th>
                    <th className="px-2 py-2">Reason</th>
                    <th className="px-2 py-2">Created At</th>
                    <th className="px-2 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentReports.length === 0 ? (
                    <tr><td colSpan={7} className="p-2 text-sm text-gray-400 text-center">No reports</td></tr>
                  ) : (
                    studentReports.map((r) => (
                      <tr key={r._id}>
                        <td className="px-2 py-1">{r.name}</td>
                        <td className="px-2 py-1">{r.enrollmentNumber}</td>
                        <td className="px-2 py-1">{r.semester}</td>
                        <td className="px-2 py-1">{r.subject}</td>
                        <td className="px-2 py-1">{r.reason}</td>
                        <td className="px-2 py-1">{new Date(r.createdAt).toLocaleString()}</td>
                        <td className="px-2 py-1">
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => handleDeleteStudentReport(r._id)}
                          >Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
