import { useState } from 'react';
import { AdminNavbar } from "./components";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherAdminPage() {
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
    setShowSuccessMessage(true);
    setTimeout(() => { setShowSuccessMessage(false); }, 3500);
    e.target.reset();
  };

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#111921] font-['Inter'] text-gray-800 dark:text-gray-100 min-h-screen">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <AdminNavbar/>

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
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvOcx8W1YLsKDUXyJxPhbn2SPMm2FQgd_lRYU0yNYrjN5KJckLLBFd_fttDlojRuvMjC6FIcbUKMptYPWYSNkoeymuAUgCoXPh49rGTEnZrJ1nzo1Ydcsjf6so-_C22og3oC4jA3D0MK9Fp_hqJRyfp1HsX3h2GTdTfk8PUfLyWUjWinmVx5B0UzR1VgzxvC2-S9iML_qXjEaEx34JUQ-xRanfIzwO1D77xaZs5SXlEPtiQU9Gisa9lLOGEDKDu1EkqFdMdmA0ou8")',
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
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-[#f6f7f8] dark:bg-[#111921] focus:outline-none focus:ring-2 focus:ring-[#197fe6] text-gray-800 dark:text-gray-100"
                placeholder="Search by Email, Phone, Unique ID, Branch, or Role"
                type="text"
              />
            </div>
            {/* --- Teachers Table --- */}
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100/50 dark:bg-gray-800/50 text-xs uppercase tracking-wider text-gray-900 dark:text-gray-100">
                  <tr>
                    <th className="px-6 py-3" scope="col">Name</th>
                    <th className="px-6 py-3" scope="col">Email</th>
                    <th className="px-6 py-3" scope="col">Phone</th>
                    <th className="px-6 py-3" scope="col">Unique ID</th>
                    <th className="px-6 py-3" scope="col">Branch</th>
                    <th className="px-6 py-3" scope="col">Role</th>
                    <th className="px-6 py-3" scope="col"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-[#f6f7f8] dark:bg-[#111921]">
                  {[
                    ["Ms. Olivia Bennett", "olivia.bennett@example.com", "(555) 123-4567", "T12345", "Science", "Teacher"],
                    ["Mr. Ethan Carter", "ethan.carter@example.com", "(555) 987-6543", "T67890", "Math", "Teacher"],
                    ["Dr. Sophia Davis", "sophia.davis@example.com", "(555) 246-8013", "T11223", "English", "Teacher"],
                    ["Mr. Liam Foster", "liam.foster@example.com", "(555) 369-1215", "T33445", "History", "Teacher"],
                    ["Ms. Ava Green", "ava.green@example.com", "(555) 482-3457", "T55667", "Art", "Teacher"],
                    ["Mr. Noah Harris", "noah.harris@example.com", "(555) 505-5679", "T77889", "Physical Education", "Teacher"],
                    ["Ms. Isabella Jones", "isabella.jones@example.com", "(555) 628-7891", "T99001", "Music", "Teacher"],
                    ["Mr. Jackson King", "jackson.king@example.com", "(555) 741-9013", "T22334", "Computer Science", "Teacher"],
                  ].map(([name, email, phone, id, branch, role]) => (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" key={id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">{name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">{email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">{phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">{id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">{branch}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">{role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-[#197fe6] dark:text-[#82b2fb] hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
      {/* --- Modal --- */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-[fadeIn_0.3s_ease-out]"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="bg-[#f6f7f8] dark:bg-[#111921] rounded-xl shadow-2xl p-8 w-full max-w-md mx-auto animate-[slideIn_0.3s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Teacher</h2>
              <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors" onClick={closeModal}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100" htmlFor="name">Full Name</label>
                <input className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 bg-[#f6f7f8] dark:bg-gray-700 focus:outline-none focus:ring-[#197fe6] focus:border-[#197fe6] text-gray-900 dark:text-gray-100"
                  id="name" name="name" required type="text" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100" htmlFor="email">Email</label>
                <input className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 bg-[#f6f7f8] dark:bg-gray-700 focus:outline-none focus:ring-[#197fe6] focus:border-[#197fe6] text-gray-900 dark:text-gray-100"
                  id="email" name="email" required type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100" htmlFor="phone">Phone</label>
                <input className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 bg-[#f6f7f8] dark:bg-gray-700 focus:outline-none focus:ring-[#197fe6] focus:border-[#197fe6] text-gray-900 dark:text-gray-100"
                  id="phone" name="phone" required type="tel" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100" htmlFor="uniqueId">Unique ID</label>
                <input className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 bg-[#f6f7f8] dark:bg-gray-700 focus:outline-none focus:ring-[#197fe6] focus:border-[#197fe6] text-gray-900 dark:text-gray-100"
                  id="uniqueId" name="uniqueId" required type="text" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100" htmlFor="branch">Branch</label>
                <select className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 bg-[#f6f7f8] dark:bg-gray-700 focus:outline-none focus:ring-[#197fe6] focus:border-[#197fe6] text-gray-900 dark:text-gray-100"
                  id="branch" name="branch" required>
                  <option>Science</option>
                  <option>Math</option>
                  <option>English</option>
                  <option>History</option>
                  <option>Art</option>
                  <option>Physical Education</option>
                  <option>Music</option>
                  <option>Computer Science</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100" htmlFor="role">Role</label>
                <select className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 px-3 bg-[#f6f7f8] dark:bg-gray-700 focus:outline-none focus:ring-[#197fe6] focus:border-[#197fe6] text-gray-900 dark:text-gray-100"
                  id="role" name="role" required>
                  <option>Teacher</option>
                  <option>Head of Department</option>
                  <option>Coordinator</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#197fe6] rounded-lg shadow-sm hover:bg-[#197fe6]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#197fe6]" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* --- Success Message --- */}
      {showSuccessMessage && (
        <div className="fixed top-20 right-6 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 animate-[fadeIn_0.5s_ease-out,fadeOut_0.5s_ease-in_3s_forwards]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined">check_circle</span>
            <p className="font-medium">Teacher added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherAdminPage;  