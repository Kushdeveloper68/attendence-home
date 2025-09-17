import React, { useState ,useEffect } from "react";
import { signupStudentApi, signupTeacherApi, sendOtpApi, verifyOtpApi } from "../apis/API";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
export default function Signup() {
  const {setToken} = useAuth()
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [uniqueid, setUniqueid] = useState("");
  const [phone, setPhone] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [signupData, setSignupData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  // Handle form submit: send OTP to email
  useEffect(() => {
      const student = localStorage.getItem("student");
      const teacher = localStorage.getItem("teacher");
      let user = null;
      if (student) user = JSON.parse(student);
      else if (teacher) user = JSON.parse(teacher);
  
      if (user && user.role) {
        if (user.role === "student") {
          navigate("/studentdashboard");
        } else if (user.role === "teacher") {
          navigate("/teacherdashboard");
        }
      }
    }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setOtpError("");
    setLoading(true);

    // Save signup data for later use
    const data =
      role === "student"
        ? { name, email, password, branch, semester, enrollment, phone, role }
        : { name, email, branch, password, uniqueid, phone, role };
    console.log(data);
    setSignupData(data);

    try {
      const res = await sendOtpApi({ email });
      console.log(res);
      if (res.success) {
        setShowOtpBox(true);
        setMsg("OTP sent to your email.");
      } else {
        setMsg(res.message || "Failed to send OTP.");
      }
    } catch (err) {
      setMsg("Failed to send OTP.");
    }
    setLoading(false);
  };

  // Handle OTP verification and signup
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpError("");
    setLoading(true);

    try {
      // Verify OTP first
      const verifyRes = await verifyOtpApi({ email, otp });
      console.log("otp verify", verifyRes);
      if (!verifyRes.success) {
        setOtpError(verifyRes.message || "Invalid OTP.");
        setLoading(false);
        return;
      }

      // OTP verified, now signup
      let signupRes;
      if (role === "student") {
        signupRes = await signupStudentApi({ ...signupData, otp });
      } else {
        signupRes = await signupTeacherApi({ ...signupData, otp });
      }
      console.log("signup", signupRes);
      if (signupRes.success) {
        setMsg("Signup successful! You can now log in.");
        setShowOtpBox(false);
        // Optionally, redirect or clear form here
        if (signupRes.user.role === "student") {
          localStorage.setItem("student", JSON.stringify(signupRes.user));
          localStorage.setItem("token", signupRes.token);
          setToken(signupRes.token)
          navigate("/studentdashboard")
        } else {
          localStorage.setItem("teacher", JSON.stringify(signupRes.user));
          localStorage.setItem("token", signupRes.token);
          setToken(signupRes.token);
          navigate("/teacherdashboard");
        }

      } else {
        setOtpError(signupRes.message || "Signup failed.");
      }
    } catch (err) {
      setOtpError("Signup failed. internal error");
    }
    setLoading(false);
  };

  return (
    <div
      className="bg-gray-50 min-h-screen flex flex-col overflow-x-hidden relative"
      style={{
        ["--select-button-svg"]: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' fill='rgb(107, 114, 128)' viewBox='0 0 256 256'%3e%3cpath d='M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z'/%3e%3c/svg%3e")`,
      }}
    >
      {/* Overlay and OTP Box */}
      {showOtpBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xs relative">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowOtpBox(false)}
              aria-label="Close"
              disabled={loading}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Enter OTP</h2>
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter OTP"
                maxLength={6}
                required
                disabled={loading}
              />
              {otpError && (
                <div className="text-red-500 text-sm text-center">{otpError}</div>
              )}
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify & Signup"}
              </button>
            </form>
            <div className="text-center text-sm text-gray-500 mt-3">
              Didn't get OTP? <button className="text-teal-600 hover:underline" onClick={async () => {
                setLoading(true);
                setOtpError("");
                setMsg("");
                try {
                  const res = await sendOtpApi({ email });
                  setMsg(res.success ? "OTP resent to your email." : res.message || "Failed to resend OTP.");
                } catch {
                  setMsg("Failed to resend OTP.");
                }
                setLoading(false);
              }} disabled={loading}>Resend</button>
            </div>
            {msg && <div className="text-center text-teal-600 mt-2">{msg}</div>}
          </div>
        </div>
      )}

      {/* Main Signup Form (blurred when OTP box is open) */}
      <div className={`flex flex-1 justify-center items-center py-12 px-4 ${showOtpBox ? "filter blur-sm pointer-events-none select-none" : ""}`}>
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
                className={`flex-1 text-center py-3 font-semibold border-b-2 transition-colors duration-300 ${role === "student"
                    ? "text-teal-600 border-teal-600"
                    : "text-gray-500 border-transparent hover:text-teal-600"
                  }`}
                type="button"
                onClick={() => setRole("student")}
                disabled={showOtpBox}
              >
                Student
              </button>
              <button
                className={`flex-1 text-center py-3 font-semibold border-b-2 transition-colors duration-300 ${role === "teacher"
                    ? "text-teal-600 border-teal-600"
                    : "text-gray-500 border-transparent hover:text-teal-600"
                  }`}
                type="button"
                onClick={() => setRole("teacher")}
                disabled={showOtpBox}
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
                disabled={showOtpBox}
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
                disabled={showOtpBox}
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
                    disabled={showOtpBox}
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
                    disabled={showOtpBox}
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
                  disabled={showOtpBox}
                >
                  <option value="" hidden disabled></option>
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
                    disabled={showOtpBox}
                  >
                    <option value="" hidden disabled></option>
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
                disabled={showOtpBox}
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
                disabled={showOtpBox}
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
                disabled={showOtpBox || loading}
              >
                {loading ? "Sending OTP..." : "Sign Up"}
              </button>
            </div>
            {msg && <div className="text-center text-red-600 mt-2">{msg}</div>}
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