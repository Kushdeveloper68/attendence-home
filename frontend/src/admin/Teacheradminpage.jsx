import React, { useState, useEffect } from 'react';
import { AdminNavbar } from "./components";
import { useNavigate } from 'react-router-dom';
import {
  getAllTeachersApi,
  getTeacherByUniqueIdApi,
  filterTeachersByBranchApi,
  addTeacherApi,
  editTeacherApi,
  deleteTeacherApi
} from '../apis/API';
import { useApi } from '../apis/API';
import { useAuth } from '../context/authcontext';
  
function TeacherAdminPage() {
  const api = useApi()
     const {authToken} = useAuth()
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchUniqueId, setSearchUniqueId] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [filterBranch, setFilterBranch] = useState('');

  const user = localStorage.getItem("admin");
  const token = localStorage.getItem("token");
  const navigator = useNavigate();

  useEffect(() => {
    if (!user && !token) navigator("/");
    const role = JSON.parse(user)?.role;
    if (role !== "admin") navigator("/");
    fetchAllTeachers();
    // eslint-disable-next-line
  }, []);

  const fetchAllTeachers = async () => {
    setLoading(true);
    setError('');
    try {
      const teachersData = await getAllTeachersApi();
      setTeachers(teachersData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchUniqueId.trim()) {
      notify('Please enter a unique ID');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const teacher = await getTeacherByUniqueIdApi(searchUniqueId.trim());
      setTeachers(teacher ? [teacher] : []);
      notify('Teacher found');
    } catch (err) {
      setError(err);
      notify(err, true);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    if (!filterBranch) {
      notify('Please select a branch');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const teachersFiltered = await filterTeachersByBranchApi(filterBranch);
      setTeachers(teachersFiltered);
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
    setSearchUniqueId('');
    fetchAllTeachers();
  };

  const handleAddTeacher = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const teacherData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      uniqueId: formData.get('uniqueId'),
      branch: formData.get('branch'),
    };
    setLoading(true);
    setError('');
    try {
      const newTeacher = await addTeacherApi(teacherData);
      setTeachers([...teachers, newTeacher]);
      closeModal();
      event.target.reset();
      notify('Teacher added successfully');
    } catch (err) {
      setError(err);
      notify(err, true);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdateTeacher = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      uniqueId: formData.get('uniqueId'),
      branch: formData.get('branch'),
    };
    setLoading(true);
    setError('');
    try {
      const updatedTeacher = await editTeacherApi(selectedTeacher._id, updatedData);
      setTeachers(teachers.map(t => t._id === selectedTeacher._id ? updatedTeacher : t));
      closeModal();
      notify('Teacher updated successfully');
    } catch (err) {
      setError(err);
      notify(err, true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (teacherId) => {
    if (!window.confirm('Are you sure you want to delete this teacher?')) return;
    setLoading(true);
    setError('');
    try {
      await deleteTeacherApi(teacherId);
      setTeachers(teachers.filter(t => t._id !== teacherId));
      notify('Teacher deleted successfully');
    } catch (err) {
      setError(err);
      notify(err, true);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsEditMode(false);
    setSelectedTeacher(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedTeacher(null);
  };

  const notify = (msg, isError = false) => {
    setSuccessMessage(msg);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleSubmit = (event) => {
    if (isEditMode) {
      handleUpdateTeacher(event);
    } else {
      handleAddTeacher(event);
    }
  };

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#111921] font-['Inter'] text-gray-800 dark:text-gray-100 min-h-screen">
      <div className="flex min-h-screen">
        <AdminNavbar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 bg-[#f6f7f8] dark:bg-[#111921] border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvOcx8W1YLsKDUXyJxPhbn2SPMm2FQgd_lRYU0yNYrjN5KJckLLBFd_fttDlojRuvMjC6FIcbUKMptYPWYSNkoeymuAUgCoXPh49rGTEnZrJ1nzo1Ydcsjf6so-_C22og3oC4jA3D0MK9Fp_hqJRyfp1HsX3h2GTdTfk8PUfLyWUjWinmVx5B0UzR1VgzxvC2-S9iML_qXjEaEx34JUQ-xRanfIzwO1D77xaZs5SXlEPtiQU9Gisa9lLOGEDKDu1EkqFdMdmA0ou8")',
                }}
              ></div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teachers</h1>
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#197fe6] rounded-lg shadow-sm hover:bg-[#197fe6]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#197fe6]"
                onClick={openModal}
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add New Teacher
              </button>
            </div>

            {/* Search and Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search by Unique ID */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300">
                    search
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-[#f6f7f8] dark:bg-[#111921] focus:outline-none focus:ring-2 focus:ring-[#197fe6] text-gray-800 dark:text-gray-100"
                    placeholder="Search by Unique ID..."
                    type="text"
                    value={searchUniqueId}
                    onChange={(e) => setSearchUniqueId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-[#197fe6] rounded-lg hover:bg-[#197fe6]/90"
                  onClick={handleSearch}
                >
                  Find
                </button>
              </div>

              {/* Filter by Branch */}
              <div className="flex gap-2">
                <select
                  className="flex-1 py-2 px-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-[#f6f7f8] dark:bg-[#111921] focus:outline-none focus:ring-2 focus:ring-[#197fe6] text-gray-800 dark:text-gray-100"
                  value={filterBranch}
                  onChange={(e) => setFilterBranch(e.target.value)}
                >
                  <option value="">Select Branch</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mining Engineering">Mining Engineering</option>
                  <option value="English">General</option>
                </select>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-[#197fe6] rounded-lg hover:bg-[#197fe6]/90"
                  onClick={handleFilter}
                >
                  Filter
                </button>
              </div>

              {/* Reset Button */}
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                onClick={handleResetFilters}
              >
                Reset All
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#197fe6]"></div>
              </div>
            )}

            {/* Teachers Table */}
            {!loading && (
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100/50 dark:bg-gray-800/50 text-xs uppercase tracking-wider text-gray-900 dark:text-gray-100">
                    <tr>
                      <th className="px-6 py-3" scope="col">Name</th>
                      <th className="px-6 py-3" scope="col">Email</th>
                      <th className="px-6 py-3" scope="col">Phone</th>
                      <th className="px-6 py-3" scope="col">Unique ID</th>
                      <th className="px-6 py-3" scope="col">Branch</th>
                      <th className="px-6 py-3" scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-[#f6f7f8] dark:bg-[#111921]">
                    {teachers.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                          No teachers found. Add a new teacher to get started.
                        </td>
                      </tr>
                    ) : (
                      teachers.map((teacher) => (
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" key={teacher._id}>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">
                            {teacher.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                            {teacher.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                            {teacher.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                            {teacher.uniqueId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                            {teacher.branch}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right space-x-4">
                            <button 
                              className="text-[#197fe6] dark:text-[#82b2fb] hover:underline"
                              onClick={() => handleEditClick(teacher)}
                            >
                              Edit
                            </button>
                            <button 
                              className="text-red-500 hover:underline"
                              onClick={() => handleDelete(teacher._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-[fadeIn_0.3s_ease-out]"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-[#f6f7f8] dark:bg-[#111921] rounded-xl shadow-2xl p-8 w-full max-w-md mx-auto animate-[slideIn_0.3s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isEditMode ? 'Edit Teacher' : 'Add New Teacher'}
              </h2>
              <button 
                className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors" 
                onClick={closeModal}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100" htmlFor="name">
                  Full Name
                </label>
                <input 
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 bg-[#f6f7f8] dark:bg-gray-700 focus:outline-none focus:ring-[#197fe6] focus:border-[#197fe6] text-gray-900 dark:text-gray-100"
                  id="name" 
                  name="name" 
                  required 
                  type="text"
                  defaultValue={isEditMode ? selectedTeacher?.name : ''}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100" htmlFor="email">
                  Email
                </label>
                <input 
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 bg-[#f6f7f8] dark:bg-gray-700 focus:outline-none focus:ring-[#197fe6] focus:border-[#197fe6] text-gray-900 dark:text-gray-100"
                  id="email" 
                  name="email" 
                  required 
                  type="email"
                  defaultValue={isEditMode ? selectedTeacher?.email : ''}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100" htmlFor="phone">
                  Phone
                </label>
                <input 
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 bg-[#f6f7f8] dark:bg-gray-700 focus:outline-none focus:ring-[#197fe6] focus:border-[#197fe6] text-gray-900 dark:text-gray-100"
                  id="phone" 
                  name="phone" 
                  required 
                  type="tel"
                  defaultValue={isEditMode ? selectedTeacher?.phone : ''}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100" htmlFor="uniqueId">
                  Unique ID
                </label>
                <input 
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 bg-[#f6f7f8] dark:bg-gray-700 focus:outline-none focus:ring-[#197fe6] focus:border-[#197fe6] text-gray-900 dark:text-gray-100"
                  id="uniqueId" 
                  name="uniqueId" 
                  required 
                  type="text"
                  defaultValue={isEditMode ? selectedTeacher?.uniqueId : ''}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100" htmlFor="branch">
                  Branch
                </label>
                <select 
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 bg-[#f6f7f8] dark:bg-gray-700 focus:outline-none focus:ring-[#197fe6] focus:border-[#197fe6] text-gray-900 dark:text-gray-100"
                  id="branch" 
                  name="branch" 
                  required
                  defaultValue={isEditMode ? selectedTeacher?.branch : ''}
                >
                  <option value="">Select Branch</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mining Engineering">Mining Engineering</option>
                  <option value="English">General</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button 
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" 
                  type="button" 
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button 
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#197fe6] rounded-lg shadow-sm hover:bg-[#197fe6]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#197fe6]" 
                  type="submit"
                >
                  {isEditMode ? 'Update Teacher' : 'Add Teacher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-20 right-6 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 animate-[fadeIn_0.5s_ease-out,fadeOut_0.5s_ease-in_3s_forwards]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined">check_circle</span>
            <p className="font-medium">{successMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherAdminPage;
