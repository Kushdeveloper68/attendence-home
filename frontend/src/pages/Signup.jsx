import React, { useState } from "react";
import { signupStudentApi, signupTeacherApi } from "../apis/API";
export default function Signup() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState();
  const [semester, setSemester] = useState();
  const [enrollment, setEnrollment] = useState();
  const [uniqueid, setUniqueid] = useState();
  const [phone, setPhone] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    if (role === "student") {
      // Handle student signup
      signupStudentApi({ name, email, password, branch, semester, enrollment, phone })
        .then((data) => {
          console.log("Student signed up successfully:", data);
        })
        .catch((error) => {
          console.error("Error signing up student:", error);
        });
    } else {
      // Handle teacher signup
      signupTeacherApi({ name, email, branch, password, uniqueid, phone })
        .then((data) => {
          console.log("Teacher signed up successfully:", data);
        })
        .catch((error) => {
          console.error("Error signing up teacher:", error);
        });
    }

  };

  return (
    <div
      className="bg-gray-50 min-h-screen flex flex-col overflow-x-hidden"
      style={{
        ["--select-button-svg"]: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' fill='rgb(107, 114, 128)' viewBox='0 0 256 256'%3e%3cpath d='M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z'/%3e%3c/svg%3e")`,
      }}
    >
      <div className="flex flex-1 justify-center items-center py-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create an Account
            </h1>
            <p className="text-gray-500 mt-2">
              Join us and manage attendance seamlessly.
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 text-center py-3 font-semibold border-b-2 transition-colors duration-300 ${
                  role === "student"
                    ? "text-teal-600 border-teal-600"
                    : "text-gray-500 border-transparent hover:text-teal-600"
                }`}
                type="button"
                onClick={() => setRole("student")}
              >
                Student
              </button>
              <button
                className={`flex-1 text-center py-3 font-semibold border-b-2 transition-colors duration-300 ${
                  role === "teacher"
                    ? "text-teal-600 border-teal-600"
                    : "text-gray-500 border-transparent hover:text-teal-600"
                }`}
                type="button"
                onClick={() => setRole("teacher")}
              >
                Teacher
              </button>
            </div>
          </div>

          {/* Signup Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="John Doe"
                className="peer h-12 w-full border border-gray-300 rounded-lg text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent px-4"
                required
              />
              <label
                htmlFor="name"
                className="absolute left-4 -top-3.5 text-gray-600 text-sm transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-teal-600 peer-focus:text-sm"
              >
                Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="john.doe@example.com"
                className="peer h-12 w-full border border-gray-300 rounded-lg text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent px-4"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 -top-3.5 text-gray-600 text-sm transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-teal-600 peer-focus:text-sm"
              >
                Email Address
              </label>
            </div>

            {/* Student-specific fields */}
            {role === "student" && (
              <>
                {/* Enrollment Number */}
                <div className="relative">
                  <input
                    id="enrollment"
                   value={enrollment}
                    onChange={(e) => setEnrollment(e.target.value)}
                    type="text"
                    placeholder="Enrollment Number"
                    className="peer h-12 w-full border border-gray-300 rounded-lg text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent px-4"
                    required
                  />
                  <label
                    htmlFor="enrollment"
                    className="absolute left-4 -top-3.5 text-gray-600 text-sm transition-all 
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                    peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-teal-600 peer-focus:text-sm"
                  >
                    Enrollment Number
                  </label>
                </div>
              </>
            )}

            {/* Teacher-specific fields */}
            {role === "teacher" && (
              <>
                {/* Unique ID */}
                <div className="relative">
                  <input 
                    id="uniqueid"
                    value={uniqueid}
                    onChange={(e) => setUniqueid(e.target.value)}
                    type="text"
                    placeholder="Unique ID"
                    className="peer h-12 w-full border border-gray-300 rounded-lg text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent px-4"
                    required
                  />
                  <label
                    htmlFor="uniqueid"
                    className="absolute left-4 -top-3.5 text-gray-600 text-sm transition-all 
                    peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                    peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-teal-600 peer-focus:text-sm"
                  >
                    Unique ID
                  </label>
                </div>
              </>
            )}

            {/* Branch & Semester (Semester only for students) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <select
                  id="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="peer h-12 w-full border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent px-4 appearance-none"
                  style={{
                    backgroundImage: "var(--select-button-svg)",
                    backgroundPosition: "right 0.75rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                  required
                >
                  <option value="" hidden disabled selected></option>
                  <option>Computer Engineering</option>
                  <option>Mechanical Engineering</option>
                  <option>Electrical Engineering</option>
                  <option>Civil Engineering</option>
                  <option>Mining Engineering</option>
                </select>
                <label
                  htmlFor="branch"
                  className="absolute left-4 -top-3.5 text-gray-600 text-sm bg-white px-1"
                >
                  Branch
                </label>
              </div>
              {role === "student" && (
                <div className="relative">
                  <select
                    id="semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="peer h-12 w-full border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent px-4 appearance-none"
                    style={{
                      backgroundImage: "var(--select-button-svg)",
                      backgroundPosition: "right 0.75rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.5em 1.5em",
                    }}
                    required
                  >
                    <option value="" hidden disabled selected></option>
                    <option>1st</option>
                    <option>2nd</option>
                    <option>3rd</option>
                    <option>4th</option>
                    <option>5th</option>
                    <option>6th</option>
                  </select>
                  <label
                    htmlFor="semester"
                    className="absolute left-4 -top-3.5 text-gray-600 text-sm bg-white px-1"
                  >
                    Semester
                  </label>
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="Phone Number"
                className="peer h-12 w-full border border-gray-300 rounded-lg text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent px-4"
                required
              />
              <label
                htmlFor="phone"
                className="absolute left-4 -top-3.5 text-gray-600 text-sm transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-teal-600 peer-focus:text-sm"
              >
                Phone Number
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="peer h-12 w-full border border-gray-300 rounded-lg text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent px-4"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 -top-3.5 text-gray-600 text-sm transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-teal-600 peer-focus:text-sm"
              >
                Password
              </label>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 ease-in-out"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}