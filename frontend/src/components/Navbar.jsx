import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const user = localStorage.getItem("student") || localStorage.getItem("teacher");

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("teacher");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const closeMenu = () => setIsOpen(false);

  const NavLinks = ({ links }) => (
    <>
      {links.map((item) => (
        <Link
          key={item.title}
          to={item.redirect}
          onClick={closeMenu}
          className="block px-4 py-2 text-[16px] font-medium text-gray-700 hover:text-[var(--primary-teal)] hover:translate-x-1 transition-all duration-200 ease-out"
        >
          {item.title}
        </Link>
      ))}
      <button
        onClick={() => {
          closeMenu();
          logout();
        }}
        className="block px-4 py-2 text-[16px] font-medium text-gray-700 hover:text-[var(--primary-teal)] hover:translate-x-1 transition-all duration-200 ease-out"
      >
        Logout
      </button>
    </>
  );

  const MobileMenu = ({ links }) => (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-white to-gray-100 shadow-2xl border-r border-gray-200 z-[9999] transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white/70 backdrop-blur-md">
        <h2 className="text-xl font-semibold text-[var(--dark-text)] tracking-wide">
          Attendance Home
        </h2>
        <button
          onClick={closeMenu}
          className="text-gray-500 hover:text-[var(--primary-teal)] text-2xl transition-all"
        >
          ✕
        </button>
      </div>
      <div className="mt-5 space-y-2">
        <NavLinks links={links} />
      </div>
    </div>
  );

  const Overlay = () =>
    isOpen && (
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] transition-opacity duration-300"
        onClick={closeMenu}
      ></div>
    );

  let links = [];
  switch (location.pathname) {
    case "/teacherdashboard":
      links = [
        { redirect: "/teacherdashboard", title: "Dashboard" },
        { redirect: "http://gpbhuj.ac.in/", title: "College Web" },
        { redirect: "/term", title: "Terms & Conditions" },
        { redirect: "/generateqr", title: "Generate QR" },
      ];
      break;

    case "/studentdashboard":
      links = [
        { redirect: "/studentdashboard", title: "Dashboard" },
        { redirect: "/term", title: "Terms & Conditions" },
        { redirect: "#how-to-use", title: "How to Use?" },
      ];
      break;

    case "/generateqr":
      links = [
        { redirect: "/teacherdashboard", title: "Dashboard" },
        { redirect: "/term", title: "Terms & Conditions" },
        { redirect: "/teacherdashboard", title: "How to Use?" },
      ];
      break;

    case "/markattendance":
      links = [
        { redirect: "/studentdashboard", title: "Dashboard" },
        { redirect: "/term", title: "Terms & Conditions" },
      ];
      break;

    default:
      links = [
        { redirect: "#", title: "Dashboard" },
        { redirect: "#", title: "Attendance" },
        { redirect: "#", title: "Courses" },
        { redirect: "#", title: "Profile" },
      ];
  }

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-[1000] border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-[var(--primary-teal)] to-cyan-400 rounded-xl shadow-md">
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-wide">
              Attendance Home
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <NavLinks links={links} />
          </div>

          {/* Profile + Hamburger */}
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full ring-2 ring-[var(--primary-teal)] ring-offset-2 bg-cover bg-center shadow-sm"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3a3YcnKCMJw42lboj-CDj4f_GGdkQZ4TddijGDlw5yt4Zwup1--G9pClBSc3-MwtpF8Rrajiy1cbv5pEL_e7zAPYNJOJeNcxUaSeR_Zv58CuXSePsJDtaXJeunrsHRsdV7HvkdXbbNu5fTAQ-wJgXOpYhTRuz7BP22NJ35c9umS9ltmyJVvKTbMpRXLnBKLaGTpKYgGgtjqqRVuumUsNXrnV8d9qj_cZDSwpgMLkoZ7A79h6221wVQld96l-AkxFR03acQdyNEw")',
              }}
            ></div>
            <button
              className="md:hidden text-3xl text-gray-700 hover:text-[var(--primary-teal)] transition-all"
              onClick={() => setIsOpen(true)}
            >
              ☰
            </button>
          </div>
        </nav>
      </header>

      {/* Sidebar & Overlay */}
      <Overlay />
      <MobileMenu links={links} />
    </>
  );
}

export default Navbar;
