import React from 'react'
import { Link, useLocation } from "react-router-dom";
import AttendancePage from './../Attendancereport';

function AdminNavbar() {
    const location = useLocation();

  switch (location.pathname) {
    case "/admin":
        return (
        <aside className="w-64 bg-[#ffffff] dark:bg-[#1f2937] flex-shrink-0 border-r border-[#e5e7eb] dark:border-[#374151]">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#111827] dark:text-[#f9fafb]">
            Attendance Home
          </h1>
        </div>

        <nav className="mt-6 px-4">
          {/* Dashboard */}
          <Link
            to="/admin"
            className="group flex items-center px-4 py-3 bg-[#197fe61a] dark:bg-[#197fe633] text-[#197fe6] rounded-lg transition-colors duration-200"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="ml-4 font-semibold">Dashboard</span>
          </Link>

          {/* Students */}
          <Link
            to="/admin/students"
            className="group flex items-center px-4 py-3 mt-2 text-[#6b7280] dark:text-[#9ca3af] hover:bg-[#197fe61a] dark:hover:bg-[#197fe633] hover:text-[#197fe6] rounded-lg transition-colors duration-200"
          >
            <svg
              className="h-6 w-6 group-hover:text-[#197fe6]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="ml-4 font-semibold">Students</span>
          </Link>

          {/* Teachers */}
          <Link
            to="/admin/teachers"
            className="group flex items-center px-4 py-3 mt-2 text-[#6b7280] dark:text-[#9ca3af] hover:bg-[#197fe61a] dark:hover:bg-[#197fe633] hover:text-[#197fe6] rounded-lg transition-colors duration-200"
          >
            <svg
              className="h-6 w-6 group-hover:text-[#197fe6]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-9-5.197"
              />
            </svg>
            <span className="ml-4 font-semibold">Teachers</span>
          </Link>

          {/* Attendance */}
          <Link
            to="/admin/attendance-report"
            className="group flex items-center px-4 py-3 mt-2 text-[#6b7280] dark:text-[#9ca3af] hover:bg-[#197fe61a] dark:hover:bg-[#197fe633] hover:text-[#197fe6] rounded-lg transition-colors duration-200"
          >
            <svg
              className="h-6 w-6 group-hover:text-[#197fe6]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="ml-4 font-semibold">Attendance</span>
          </Link>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-64 p-4">
          <Link
            to=""
            className="group flex items-center px-4 py-3 text-[#6b7280] dark:text-[#9ca3af] hover:bg-[#197fe61a] dark:hover:bg-[#197fe633] hover:text-[#197fe6] rounded-lg transition-colors duration-200"
          >
            <svg
              className="h-6 w-6 group-hover:text-[#197fe6]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="ml-4 font-semibold">Logout</span>
          </Link>
        </div>
      </aside>

        )
        break;
        case "/admin/students":
         return (
            <aside className="w-64 flex-shrink-0 bg-[#f6f7f8] dark:bg-[#111921] p-4 shadow-lg">
            <div className="flex h-full flex-col justify-between">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3 px-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#197fe6] text-white">
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                    </svg>
                  </div>
                  <h1 className="text-xl font-bold text-[#111921] dark:text-[#f6f7f8]">
                    Attendance Home
                  </h1>
                </div>
                <nav className="flex flex-col gap-2">
                  <Link
                    className="flex items-center gap-3 rounded bg-[#197fe6]/20 px-3 py-2 text-[#111921] dark:text-[#f6f7f8] transition-colors hover:bg-[#197fe6]/20"
                    to="/admin"
                  >
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded bg-[#197fe6]/20 px-3 py-2 font-medium text-[#197fe6] transition-colors"
                    to="/admin/students"
                  >
                    <span className="material-symbols-outlined">group</span>
                    <span>Students</span>
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded px-3 py-2 text-[#111921] dark:text-[#f6f7f8] transition-colors hover:bg-[#197fe6]/20"
                    to="/admin/teachers"
                  >
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span className="font-medium">Teachers</span>
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded px-3 py-2 text-[#111921] dark:text-[#f6f7f8] transition-colors hover:bg-[#197fe6]/20"
                    to="/admin/attendance-report"
                  >
                    <span className="material-symbols-outlined">bar_chart</span>
                    <span className="font-medium"> Attendance </span>
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded px-3 py-2 text-[#111921] dark:text-[#f6f7f8] transition-colors hover:bg-[#197fe6]/20"
                    to="/admin"
                  >
                    <span className="material-symbols-outlined">settings</span>
                    <span className="font-medium">Settings</span>
                  </Link>
                </nav>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  className="flex items-center gap-3 rounded px-3 py-2 text-[#111921] dark:text-[#f6f7f8] transition-colors hover:bg-[#197fe6]/20"
                  to=""
                >
                  <span className="material-symbols-outlined">help</span>
                  <span className="font-medium">Help and Docs</span>
                </Link>
                <Link
                  className="flex items-center gap-3 rounded px-3 py-2 text-[#111921] dark:text-[#f6f7f8] transition-colors hover:bg-[#197fe6]/20"
                  to=""
                >
                  <span className="material-symbols-outlined">logout</span>
                  <span className="font-medium">Logout</span>
                </Link>
              </div>
            </div>
          </aside> 
        )
        break;
        case "/admin/teachers":
         return (
            <aside className="w-64 shrink-0 bg-[#f6f7f8] dark:bg-[#111921] border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="flex items-center gap-2 p-6 text-xl font-bold text-gray-900 dark:text-gray-100">
            <svg className="h-8 w-8 text-[#197fe6]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
              <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
            <span>EduTrack</span>
          </div>
          <nav className="flex-1 px-4 py-2 space-y-2">
            <Link className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#197fe6]/10 dark:hover:bg-[#197fe6]/20 transition-colors text-white-800 dark:text-white" to="/admin">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#197fe6]/20 dark:bg-[#197fe6]/30 text-white-800 dark:text-[#82b2fb]" to="/admin/teachers">
              <span className="material-symbols-outlined">group</span>
              <span className="text-sm font-medium">Teachers</span>
            </Link>
            <Link className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#197fe6]/10 dark:hover:bg-[#197fe6]/20 transition-colors text-white-800 dark:text-white" to="/admin/students">
              <span className="material-symbols-outlined">school</span>
              <span className="text-sm font-medium">Students</span>
            </Link>
            <Link className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#197fe6]/10 dark:hover:bg-[#197fe6]/20 transition-colors text-white-800 dark:text-white" to="/admin/attendance-report">
              <span className="material-symbols-outlined">event_note</span>
              <span className="text-sm font-medium">Attendance</span>
            </Link>
            <Link className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#197fe6]/10 dark:hover:bg-[#197fe6]/20 transition-colors text-white-800 dark:text-gray-100" to="">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Link className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#197fe6]/10 dark:hover:bg-[#197fe6]/20 transition-colors text-white-800 dark:text-gray-100" to="">
              <span className="material-symbols-outlined">help</span>
              <span className="text-sm font-medium">Help and feedback</span>
            </Link>
          </div>to
        </aside>
        )
        break;
        case "/admin/attendance-report":
         return (
              <aside
        className="w-64 p-6 flex-col hidden lg:flex shadow-md"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: "#197fe6" }}
          >
            <span className="material-symbols-outlined" style={{ color: "#ffffff" }}>
              event_available
            </span>
          </div>
          <h1 className="text-xl font-bold">AMS</h1>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            style={{ color: "#111921", backgroundColor: "transparent" }}
            to="/admin"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-3 rounded-lg"
            style={{
              color: "#197fe6",
              backgroundColor: "rgba(25,127,230,0.1)",
            }}
            to="/attendance-report"
          >
            <span className="material-symbols-outlined">event_note</span>
            <span className="font-medium">Attendance</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            style={{ color: "#111921", backgroundColor: "transparent" }}
            to="/admin/students"
          >
            <span className="material-symbols-outlined">school</span>
            <span className="font-medium">Students</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            style={{ color: "#111921", backgroundColor: "transparent" }}
            to="/admin/teachers"
          >
            <span className="material-symbols-outlined">group</span>
            <span className="font-medium">Teachers</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            style={{ color: "#111921", backgroundColor: "transparent" }}
            to=""
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-medium">Settings</span>
          </Link>
        </nav>
      </aside>

        )
        break;
    default:
        break;
  }
}

export default AdminNavbar 