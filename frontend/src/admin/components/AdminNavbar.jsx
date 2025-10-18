import React from 'react'
import { Link, useLocation } from "react-router-dom";
import AttendancePage from './../Attendancereport';

function AdminNavbar() {
    const location = useLocation();

  const logout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("teacher");
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    window.location.href = "/";
  };
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
            className="group flex items-center px-4 py-3 dark:text-[#9ca3af] hover:bg-[#197fe61a] hover:text-[#197fe6] text-[#6b7280] rounded-lg transition-colors duration-200"
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
          <button
            onClick={logout}
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
          </button>
        </div>
      </aside>

        )
}

export default AdminNavbar 