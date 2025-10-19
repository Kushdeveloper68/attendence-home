import React, { useState, useEffect } from 'react';
import { AdminNavbar } from './components';
import { useNavigate } from 'react-router-dom';
import {
  getAllStudentsApi,
  getStudentByEnrollmentApi,
  filterStudentsApi,
  addStudentApi,
  editStudentApi,
  deleteStudentApi
} from '../apis/API';
import { useApi } from '../apis/API';
import { useAuth } from '../context/authcontext';

function StudentAdminPage() {
  const api = useApi()
     const {authToken} = useAuth()
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchEnrollment, setSearchEnrollment] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterBranch, setFilterBranch] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigator = useNavigate();
  const user = localStorage.getItem("admin");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user && !token) navigator("/");
    const role = JSON.parse(user)?.role;
    if (role !== "admin") navigator("/");
    fetchAllStudents();
    // eslint-disable-next-line
  }, []);

  const fetchAllStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const studentsData = await getAllStudentsApi();
      setStudents(studentsData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchEnrollment.trim()) {
      notify('Please enter an enrollment number');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const student = await getStudentByEnrollmentApi(searchEnrollment.trim());
      setStudents(student ? [student] : []);
      notify('Student found');
    } catch (err) {
      setError(err);
      notify(err, true);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    if (!filterBranch || !filterSemester) {
      notify('Please select both branch and semester');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const studentsFiltered = await filterStudentsApi(filterBranch, filterSemester);
      setStudents(studentsFiltered);
      notify('Filter applied');
    } catch (err) {
      setError(err);
      notify(err, true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilterBranch('');
    setFilterSemester('');
    setSearchEnrollment('');
    fetchAllStudents();
  };

  const handleAddStudent = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const studentData = {
      name: formData.get('student-name'),
      email: formData.get('student-email'),
      phone: formData.get('student-phone'),
      enrollmentNumber: formData.get('enrollment-no'),
      branch: formData.get('branch'),
      semester: formData.get('semester'),
    };
    setLoading(true);
    setError('');
    try {
      const newStudent = await addStudentApi(studentData);
      setStudents([...students, newStudent]);
      hideModal();
      event.target.reset();
      notify('Student added successfully');
    } catch (err) {
      setError(err);
      notify(err, true);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdateStudent = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedData = {
      name: formData.get('student-name'),
      email: formData.get('student-email'),
      phone: formData.get('student-phone'),
      enrollmentNumber: formData.get('enrollment-no'),
      branch: formData.get('branch'),
      semester: formData.get('semester'),
    };
    setLoading(true);
    setError('');
    try {
      const updatedStudent = await editStudentApi(selectedStudent._id, updatedData);
      setStudents(students.map(s => s._id === selectedStudent._id ? updatedStudent : s));
      hideModal();
      notify('Student updated successfully');
    } catch (err) {
      setError(err);
      notify(err, true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    setLoading(true);
    setError('');
    try {
      await deleteStudentApi(studentId);
      setStudents(students.filter(s => s._id !== studentId));
      notify('Student deleted successfully');
    } catch (err) {
      setError(err);
      notify(err, true);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsEditMode(false);
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedStudent(null);
  };

  const notify = (msg, isError = false) => {
    setSuccessMessage(msg);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleSubmit = (event) => {
    if (isEditMode) {
      handleUpdateStudent(event);
    } else {
      handleAddStudent(event);
    }
  };

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#111921] font-['Inter']">
      <div className="relative flex h-auto min-h-screen w-full flex-col">
        <div className="flex h-full w-full">
          <AdminNavbar />
          <div className="flex flex-1 flex-col">
            
            {/* Main Content */}
            <main className="flex-1 p-6">
              <div className="flex flex-col gap-6">
                {/* Search and Add Student */}
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <h2 className="text-3xl font-bold text-[#111921] dark:text-[#f6f7f8]">
                    Students
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="relative w-full max-w-sm">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">
                          search
                        </span>
                        <input
                          className="w-full rounded-lg border border-zinc-200 bg-[#f6f7f8] dark:border-zinc-700 dark:bg-[#111921] py-2 pl-10 pr-4 text-[#fff] dark:text-[#fff] focus:outline-none focus:ring-2 focus:ring-[#197fe6]"
                          placeholder="Search by Enrollment No..."
                          value={searchEnrollment}
                          onChange={(e) => setSearchEnrollment(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                      </div>
                      <button
                        className="flex items-center gap-2 rounded-lg bg-[#197fe6] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#197fe6]/80"
                        onClick={handleSearch}
                      >
                        <span className="material-symbols-outlined">search</span>
                        <span>Find</span>
                      </button>
                    </div>
                    <button
                      className="flex items-center gap-2 rounded-lg bg-[#197fe6] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#197fe6]/80"
                      onClick={showModal}
                    >
                      <span className="material-symbols-outlined">add</span>
                      <span>Add Student</span>
                    </button>
                  </div>
                </div>
                {/* Filter Section */}
                <div className="rounded-xl border border-zinc-200 bg-[#f6f7f8] dark:border-zinc-800 dark:bg-[#111921] p-6 shadow-md">
                  <h3 className="text-lg font-semibold mb-4 text-[#111921] dark:text-[#f6f7f8]">Filter Students</h3>
                  <div className="flex flex-wrap items-end gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">Branch</label>
                      <select
                        className="w-full rounded-lg border px-4 py-2 border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] text-white"
                        value={filterBranch}
                        onChange={e => setFilterBranch(e.target.value)}
                      >
                        <option value="">Select Branch</option>
                        <option value="Computer Engineering">Computer Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                      </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">Semester</label>
                      <select
                        className="w-full rounded-lg border px-4 py-2 border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] text-white"
                        value={filterSemester}
                        onChange={e => setFilterSemester(e.target.value)}
                      >
                        <option value="">Select Semester</option>
                        <option value="1">1st Semester</option>
                        <option value="2">2nd Semester</option>
                        <option value="3">3rd Semester</option>
                        <option value="4">4th Semester</option>
                        <option value="5">5th Semester</option>
                        <option value="6">6th Semester</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex items-center gap-2 rounded-lg bg-[#197fe6] px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#197fe6]/80"
                        onClick={handleFilter}
                      >
                        <span className="material-symbols-outlined">filter_list</span>
                        <span>Apply Filter</span>
                      </button>
                      <button
                        className="flex items-center gap-2 rounded-lg border px-6 py-2 text-sm font-medium border-zinc-300 dark:border-zinc-600 text-[#111921] dark:text-[#f6f7f8] shadow-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        onClick={handleResetFilters}
                      >
                        <span className="material-symbols-outlined">refresh</span>
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Error Message */}
                {error && (
                  <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-400">{error}</div>
                )}
                {/* Loading Indicator */}
                {loading && (
                  <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#197fe6]"></div>
                  </div>
                )}
                {/* Table */}
                {!loading && (
                  <div className="overflow-hidden rounded-xl border bg-[#f6f7f8] border-zinc-200 dark:border-zinc-800 dark:bg-[#111921] shadow-md">
                    <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead className="bg-zinc-100 dark:bg-zinc-800">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Enrollment No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Branch</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Semester</th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                          {students.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400">No students found</td>
                            </tr>
                          ) : (
                            students.map(student => (
                              <tr key={student._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#111921] dark:text-[#f6f7f8]">{student.name}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{student.email}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{student.phone}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{student.enrollmentNumber}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{student.branch}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{student.semester}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <div className="flex items-center justify-end gap-4">
                                    <button className="text-[#197fe6] hover:underline" onClick={() => handleEditClick(student)}>Edit</button>
                                    <button className="text-red-500 hover:underline" onClick={() => handleDelete(student._id)}>Delete</button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div
            aria-labelledby="modal-title"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            role="dialog"
            onClick={(e) => { if (e.target === e.currentTarget) hideModal(); }}
          >
            <div className="w-full max-w-2xl rounded-xl bg-[#f6f7f8] dark:bg-[#111921] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-4">
                <h3 className="text-xl font-bold text-[#111921] dark:text-[#f6f7f8]" id="modal-title">
                  {isEditMode ? 'Edit Student' : 'Add New Student'}
                </h3>
                <button className="rounded-lg p-2 text-zinc-500 dark:text-zinc-400 transition-colors hover:bg-[#197fe6]/20 hover:text-[#197fe6]" type="button" onClick={hideModal}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-white dark:text-white" htmlFor="student-name">Full Name</label>
                  <input className="mt-1 text-white block w-full rounded-lg border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] shadow-sm px-4 py-2 focus:border-[#197fe6] focus:ring-[#197fe6] sm:text-sm"
                    id="student-name" name="student-name" required type="text" defaultValue={isEditMode ? selectedStudent?.name : ''} placeholder="Enter student fullname" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="student-email">Email Address</label>
                  <input className="mt-1  text-white block w-full rounded-lg border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] shadow-sm px-4 py-2 focus:border-[#197fe6] focus:ring-[#197fe6] sm:text-sm"
                    id="student-email" name="student-email" required type="email" defaultValue={isEditMode ? selectedStudent?.email : ''} placeholder="Enter email address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="student-phone">Phone Number</label>
                  <input className="mt-1 text-white block w-full rounded-lg border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] shadow-sm px-4 py-2 focus:border-[#197fe6] focus:ring-[#197fe6] sm:text-sm"
                    id="student-phone" name="student-phone" required type="tel" defaultValue={isEditMode ? selectedStudent?.phone : ''} placeholder="Enter phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="enrollment-no">Enrollment No.</label>
                  <input className="mt-1 text-white block w-full rounded-lg border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] shadow-sm px-4 py-2 focus:border-[#197fe6] focus:ring-[#197fe6] sm:text-sm"
                    id="enrollment-no" name="enrollment-no" required type="text" defaultValue={isEditMode ? selectedStudent?.enrollmentNumber : ''} placeholder="Enter enrollment number"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="branch">Branch</label>
                  <select className="mt-1 text-white  block w-full rounded-lg border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] shadow-sm px-4 py-2 focus:border-[#197fe6] focus:ring-[#197fe6] sm:text-sm"
                    id="branch" name="branch" required defaultValue={isEditMode ? selectedStudent?.branch : ''}>
                    <option value="">Select Branch</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="semester">Semester</label>
                  <select className="mt-1 text-white block w-full rounded-lg border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] shadow-sm px-4 py-2 focus:border-[#197fe6] focus:ring-[#197fe6] sm:text-sm"
                    id="semester" name="semester" required defaultValue={isEditMode ? selectedStudent?.semester : ''}>
                    <option value="">Select Semester</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div className="col-span-1 sm:col-span-2 flex justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <button className="rounded-lg border px-4 py-2 border-zinc-300 dark:border-zinc-600 text-sm font-medium text-[#111921] dark:text-[#f6f7f8] shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" type="button" onClick={hideModal}>Cancel</button>
                  <button className="flex items-center gap-2 rounded-lg bg-[#197fe6] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#197fe6]/80" type="submit">
                    <span>{isEditMode ? 'Update Student' : 'Add Student'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-10 right-10 z-50 rounded-xl bg-green-500 p-4 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">check_circle</span>
              <p className="font-medium">{successMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentAdminPage;
