import React, { useState } from "react";
import  "../styles/generateqr.css"
const GenerateQR = () => {
  const [showQR, setShowQR] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-[var(--light-gray-50)] flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              className="h-8 w-8 text-[var(--teal-500)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            <h1 className="text-2xl font-bold text-[var(--navy-800)]">
              EduTrack
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Dashboard", "Courses", "Attendance", "Reports", "Settings"].map(
              (item) => (
                <a
                  key={item}
                  className="text-gray-600 hover:text-[var(--teal-500)] font-medium"
                  href="#"
                >
                  {item}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApHsYZKQ_WvhDagDBvbmTcDc-PRoVISKnXf5ZGkmungHivuvQNTnvkV-HPCx_F8XHb1wi7iyOxBAbGJFJ9hekazJ24H9X3SmjXtezfPiNguCBshVjUKBe16ScUY-e8J1-p9n-tuGa7Leeow4VpAudkfEGEtckjioukt2XliIo-Hp8h1AXiQKNPSDyXVV_lExqq8vCbT4PK_tsB7Y9itn4vKYYbXqCcP88qNiHmuUHO_DX-kji4ohB8cfmVAc4AsItiB2ZWcI-f3Q')",
              }}
            />
            <button className="md:hidden text-gray-600 hover:text-[var(--teal-500)]">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[var(--navy-800)] mb-10">
            Generate Attendance QR
          </h2>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="branch"
                >
                  Branch
                </label>
                <select
                  id="branch"
                  name="branch"
                  className="form-select appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal-500)] focus:border-[var(--teal-500)] transition"
                >
                  <option>Select Branch</option>
                  <option>Computer Science</option>
                  <option>Mechanical Engineering</option>
                  <option>Electronics & Communication</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="semester"
                >
                  Semester
                </label>
                <select
                  id="semester"
                  name="semester"
                  className="form-select appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal-500)] focus:border-[var(--teal-500)] transition"
                >
                  <option>Select Semester</option>
                  {[...Array(8)].map((_, i) => (
                    <option key={i}>{i + 1}st</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter Subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal-500)] focus:border-[var(--teal-500)] transition"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowQR(true)}
                className="btn-generateqr-primary font-bold py-4 px-10 text-lg rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Generate QR Code
              </button>
            </div>
          </div>

          {/* QR Card */}
          {showQR && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in">
              <img
                alt="QR Code"
                className="mx-auto mb-6 rounded-lg ring-4 ring-[var(--light-gray-200)] p-2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUeNosSrxDHPWf7ff9Sg9wKA6f435DJub-dpXZPluATRXENk7oYDLLHXJMvmtO_ino1jIAZp269vY-4cd9FsQl1ZWt9WZjej3uLhOogKn4JdbKJYigJVzDA3rhafDUUJwM4R7WtHPuue_QlaGLpB9vewsnHkV3_n_UCziWNRF0a4QcICDD39Red54eM1Je_9ZsglEzUeQEDoMoqF8qMvxfkf9LziF_oh5SG97ppBywKBwaRbt0pDjBZmRdusXikzxZbHfORjeTuA"
              />
              <h3 className="text-2xl font-bold text-[var(--navy-800)] mb-2">
                Your QR Code is Ready!
              </h3>
              <p className="text-gray-600 mb-8">
                Scan this code to mark attendance.
              </p>
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="btn-generateqr-secondary flex items-center gap-2 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined">download</span>
                  Download
                </button>
                <button className="bg-gray-200 text-gray-800 flex items-center gap-2 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-300 transform hover:-translate-y-0.5 transition-all">
                  <span className="material-symbols-outlined">share</span>
                  Share
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[var(--light-gray-200)] mt-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 text-sm">
              © 2024 EduTrack. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Contact Us"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-gray-500 hover:text-[var(--teal-500)] text-sm font-medium"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.target.classList.contains("fixed") && setShowModal(false)}
        >
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center relative transform transition-all scale-100">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-bold text-[var(--navy-800)] mb-4">
              QR Code Preview
            </h3>
            <img
              alt="QR Code Preview"
              className="mx-auto mb-6 rounded-lg"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPgY29NJUpbdyaaU0JNf84TMyi3x1ZaTJKILMODUjDwEPutt1tZFueCQzWTQmnKvFohvFsxNNa2nZWdSh0T4-KC3uIU_cxnQ-NtHOQEg9JPdxlHkptHs-jLQUM_geBzwUn4BSnvXLdjSd8ly3VxlG7QgiPEuSwh4MSOP-3_utfIRa-BtZLwDNRlbY999_437CjqhipzWp_Mn7dpySt7NUToh8ojIgU3Y1j0aYdd6VW_0E7S4vAE8LVxO08XqqsSyVnfV0wfa1EoQ"
            />
            <button className="btn-generateqr-primary font-bold py-3 px-8 text-base rounded-lg shadow-md hover:shadow-xl transition-all">
              Confirm Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateQR;
