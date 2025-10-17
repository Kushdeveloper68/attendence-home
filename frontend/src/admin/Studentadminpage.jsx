import { useState } from 'react';
import {AdminNavbar }from './components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function StudentAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
const user = localStorage.getItem("student") || localStorage.getItem("teacher")|| localStorage.getItem("admin");
  const token = localStorage.getItem("token");
 const navigator = useNavigate();
 const [parsedUser, setParsedUser] = useState({})

    useEffect(() => {
      if (!user && !token) navigator("/");
      const role = JSON.parse(user)?.role;
      setParsedUser(JSON.parse(user));
      if (role !== "admin") {
        navigator("/");
      }
    }, [user])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccessMessage = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    hideModal();
    handleSuccessMessage();
    event.target.reset();
  };

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#111921] font-['Inter']">
      <div className="relative flex h-auto min-h-screen w-full flex-col">
        <div className="flex h-full w-full">
          {/* Sidebar */}
         <AdminNavbar/>

          <div className="flex flex-1 flex-col">
            {/* Header */}
            <header className="flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-700 px-6">
              <div className="flex items-center gap-4">
                <button className="rounded-lg p-2 text-[#111921] dark:text-[#f6f7f8] transition-colors hover:bg-[#197fe6]/20">
                  <span className="material-symbols-outlined">menu</span>
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative rounded-lg p-2 text-[#111921] dark:text-[#f6f7f8] transition-colors hover:bg-[#197fe6]/20">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#197fe6] opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#197fe6]"></span>
                  </span>
                </button>
                <div
                  className="h-10 w-10 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYMftuZuBH9pCLv6thwHLciokjTEenTReIQv6eCEBMnqPOptKPoSGGokdJ34QudpBoxhktY4iyJjw-IgJBNoMTkQfUj3iKp4JwKgPL0uUeDoIHPo9fCZopiwvbtqKfz8VDbrr80ihySe0jZmqr04v4OFbAJlnRLTbeuODFzRVBvVTQGDXbfbECNzjprWEJ5Zdnk5svdExxhkXU19VGmJwilLVEgLXQ9cvnipJTJgdswmcFI5LHnW2-GhU2VrAWfzW6XkBDtCeO0nI")',
                  }}
                ></div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <h2 className="text-3xl font-bold text-[#111921] dark:text-[#f6f7f8]">
                    Students
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="relative w-full max-w-sm">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">
                        search
                      </span>
                      <input
                        className="w-full rounded-lg border border-zinc-200 bg-[#f6f7f8] dark:border-zinc-700 dark:bg-[#111921] py-2 pl-10 pr-4 text-[#111921] dark:text-[#f6f7f8] focus:outline-none focus:ring-2 focus:ring-[#197fe6]"
                        placeholder="Search by Name, Email, etc..."
                      />
                    </div>
                    <button
                      className="flex items-center gap-2 rounded-lg bg-[#197fe6] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#197fe6]/80 focus:outline-none focus:ring-2 focus:ring-[#197fe6] focus:ring-offset-2 dark:focus:ring-offset-[#111921]"
                      onClick={showModal}
                    >
                      <span className="material-symbols-outlined">add</span>
                      <span>Add Student</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-[#f6f7f8] dark:border-zinc-800 dark:bg-[#111921] shadow-md">
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead className="bg-zinc-100 dark:bg-zinc-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Phone
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Enrollment No
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Branch
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Semester
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Role
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#111921] dark:text-[#f6f7f8]">
                            Sophia Clark
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            sophia.clark@example.com
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            555-123-4567
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            ENR2021001
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            Computer Science
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            4
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            Student
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-4">
                              <button className="text-[#197fe6] hover:underline">
                                Edit
                              </button>
                              <button className="text-red-500 hover:underline">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#111921] dark:text-[#f6f7f8]">
                            Liam Harris
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            liam.harris@example.com
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            555-987-6543
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            ENR2021002
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            Electrical Engineering
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            6
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            Student
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-4">
                              <button className="text-[#197fe6] hover:underline">
                                Edit
                              </button>
                              <button className="text-red-500 hover:underline">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#111921] dark:text-[#f6f7f8]">
                            Olivia Bennett
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            olivia.bennett@example.com
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            555-246-8013
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            ENR2021003
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            Mechanical Engineering
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            2
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            Student
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-4">
                              <button className="text-[#197fe6] hover:underline">
                                Edit
                              </button>
                              <button className="text-red-500 hover:underline">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#111921] dark:text-[#f6f7f8]">
                            Noah Foster
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            noah.foster@example.com
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            555-369-1470
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            ENR2021004
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            Civil Engineering
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            8
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                            Student
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-4">
                              <button className="text-[#197fe6] hover:underline">
                                Edit
                              </button>
                              <button className="text-red-500 hover:underline">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
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
            onClick={(e) => {
              if (e.target === e.currentTarget) hideModal();
            }}
          >
            <div className="w-full max-w-2xl rounded-xl bg-[#f6f7f8] dark:bg-[#111921] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-4">
                <h3
                  className="text-xl font-bold text-[#111921] dark:text-[#f6f7f8]"
                  id="modal-title"
                >
                  Add New Student
                </h3>
                <button
                  className="rounded-lg p-2 text-zinc-500 dark:text-zinc-400 transition-colors hover:bg-[#197fe6]/20 hover:text-[#197fe6]"
                  type="button"
                  onClick={hideModal}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form
                className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    htmlFor="student-name"
                  >
                    Full Name
                  </label>
                  <input
                    className="mt-1 block w-full rounded-lg border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] shadow-sm focus:border-[#197fe6] focus:ring-[#197fe6] sm:text-sm"
                    id="student-name"
                    name="student-name"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    htmlFor="student-email"
                  >
                    Email Address
                  </label>
                  <input
                    className="mt-1 block w-full rounded-lg border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] shadow-sm focus:border-[#197fe6] focus:ring-[#197fe6] sm:text-sm"
                    id="student-email"
                    name="student-email"
                    required
                    type="email"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    htmlFor="student-phone"
                  >
                    Phone Number
                  </label>
                  <input
                    className="mt-1 block w-full rounded-lg border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] shadow-sm focus:border-[#197fe6] focus:ring-[#197fe6] sm:text-sm"
                    id="student-phone"
                    name="student-phone"
                    required
                    type="tel"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    htmlFor="enrollment-no"
                  >
                    Enrollment No.
                  </label>
                  <input
                    className="mt-1 block w-full rounded-lg border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] shadow-sm focus:border-[#197fe6] focus:ring-[#197fe6] sm:text-sm"
                    id="enrollment-no"
                    name="enrollment-no"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    htmlFor="branch"
                  >
                    Branch
                  </label>
                  <select
                    className="mt-1 block w-full rounded-lg border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] shadow-sm focus:border-[#197fe6] focus:ring-[#197fe6] sm:text-sm"
                    id="branch"
                    name="branch"
                    required
                  >
                    <option>Computer Science</option>
                    <option>Electrical Engineering</option>
                    <option>Mechanical Engineering</option>
                    <option>Civil Engineering</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    htmlFor="semester"
                  >
                    Semester
                  </label>
                  <input
                    className="mt-1 block w-full rounded-lg border-zinc-300 bg-[#f6f7f8] dark:border-zinc-600 dark:bg-[#111921] shadow-sm focus:border-[#197fe6] focus:ring-[#197fe6] sm:text-sm"
                    id="semester"
                    max="8"
                    min="1"
                    name="semester"
                    required
                    type="number"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <input
                    className="mt-1 block w-full rounded-lg border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-700 shadow-sm sm:text-sm"
                    id="role"
                    name="role"
                    readOnly
                    type="text"
                    value="Student"
                  />
                </div>
                <div className="col-span-1 sm:col-span-2 flex justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <button
                    className="rounded-lg border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-sm font-medium text-[#111921] dark:text-[#f6f7f8] shadow-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    type="button"
                    onClick={hideModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex items-center gap-2 rounded-lg bg-[#197fe6] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#197fe6]/80 focus:outline-none focus:ring-2 focus:ring-[#197fe6] focus:ring-offset-2 dark:focus:ring-offset-[#111921]"
                    type="submit"
                  >
                    <span>Add Student</span>
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
              <p className="font-medium">Student added successfully!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentAdminPage;
