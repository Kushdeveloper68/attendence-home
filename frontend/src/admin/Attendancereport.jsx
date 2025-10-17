import React from "react";
import { AdminNavbar } from "./components";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AttendancePage() {
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
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f6f7f8", color: "#111921" }}>
      {/* Sidebar */}
    <AdminNavbar/>
      {/* Main content */}
      <main className="flex-1">
        <header
          className="flex items-center justify-between p-6 shadow-md"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-2xl font-bold">Attendance Records</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="relative p-2 rounded-full transition-colors"
              style={{ backgroundColor: "transparent" }}
            >
              <span className="material-symbols-outlined">notifications</span>
              <span
                className="absolute top-1 right-1 block h-2 w-2 rounded-full"
                style={{ backgroundColor: "#ef4444" }}
              ></span>
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
            <button
              className="p-2 rounded-full transition-colors"
              style={{ backgroundColor: "transparent" }}
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </header>

        <div className="p-6">
          {/* Search and Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:max-w-md">
              <span style={{ color: "#6b7280" }} className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2">
                search
              </span>
              <input
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:ring-2 transition"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  color: "#111921",
                  outlineColor: "#197fe6",
                }}
                placeholder="Search by Name, Email, Enrollment, etc."
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 px-4 py-3 rounded-lg shadow-sm transition-colors"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  color: "#6b7280",
                }}
              >
                <span className="material-symbols-outlined">refresh</span>
                <span>Refresh</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-3 rounded-lg shadow-sm transition-colors"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  color: "#6b7280",
                }}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back</span>
              </button>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="rounded-lg shadow-md overflow-x-auto" style={{ backgroundColor: "#ffffff" }}>
            <table className="w-full text-left">
              <thead style={{ borderBottom: "1px solid #e5e7eb" }}>
                <tr>
                  <th className="p-4 font-semibold">Subject</th>
                  <th className="p-4 font-semibold">Teacher Name</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold text-center">Status</th>
                  <th className="p-4 font-semibold">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sub: "Calculus", teacher: "Dr. Eleanor Bennett", date: "2024-07-26", status: "Present", ip: "192.168.1.100", color: "#10b981", bg: "rgba(16,185,129,0.2)" },
                  { sub: "Physics", teacher: "Dr. Charles Harris", date: "2024-07-26", status: "Absent", color: "#ef4444", bg: "rgba(239,68,68,0.2)" },
                  { sub: "Chemistry", teacher: "Dr. Sophia Clark", date: "2024-07-25", status: "Present", color: "#10b981", bg: "rgba(16,185,129,0.2)" },
                  { sub: "Biology", teacher: "Dr. Daniel Lewis", date: "2024-07-25", status: "Present", color: "#10b981", bg: "rgba(16,185,129,0.2)" },
                  { sub: "Computer Science", teacher: "Dr. Olivia Martinez", date: "2024-07-24", status: "Absent", color: "#ef4444", bg: "rgba(239,68,68,0.2)" },
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td className="p-4 font-medium">{row.sub}</td>
                    <td className="p-4" style={{ color: "#6b7280" }}>{row.teacher}</td>
                    <td className="p-4" style={{ color: "#6b7280" }}>{row.date}</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: row.bg, color: row.color }}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-4" style={{ color: "#6b7280" }}>{row.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Attendance Summary */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Attendance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Present", value: "80%", color: "#10b981" },
                { label: "Absent", value: "20%", color: "#ef4444" },
                { label: "Total Classes", value: "50", color: "#111921" },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg shadow-md"
                  style={{ backgroundColor: "#ffffff", color: card.color }}
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
                      strokeDasharray="80, 100"
                      strokeLinecap="round"
                      strokeWidth="4"
                    ></path>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">80%</span>
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
