import React from "react";

export default function Login() {
  return (
    <div className="bg-[var(--light-gray)] min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      {/* Logo and Title */}
      <div className="absolute top-0 left-0 p-6 flex items-center gap-3 text-gray-800">
        <div className="size-8 text-[var(--navy)]">
          <svg
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
              fill="currentColor"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-[var(--navy)] text-2xl font-bold">EduTrack</h1>
      </div>

      {/* Main Card */}
      <main className="w-full max-w-md">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--navy)]">
              Welcome Back!
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              Please enter your details to sign in.
            </p>
          </div>

          <form className="space-y-6">
            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <svg
                  fill="currentColor"
                  height="24px"
                  width="24px"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path>
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email"
                className="form-input w-full rounded-lg border-gray-300 focus:border-[var(--teal)] focus:ring-[var(--teal)] h-14 pl-12 pr-4 text-base font-medium text-gray-700 placeholder:text-gray-400 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <svg
                  fill="currentColor"
                  height="24px"
                  width="24px"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z"></path>
                </svg>
              </div>
              <input
                type="password"
                placeholder="Password"
                className="form-input w-full rounded-lg border-gray-300 focus:border-[var(--teal)] focus:ring-[var(--teal)] h-14 pl-12 pr-4 text-base font-medium text-gray-700 placeholder:text-gray-400 transition"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-end">
              <a
                href="#"
                className="text-sm font-medium text-[var(--navy)] hover:text-[var(--teal)] hover:underline transition"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center rounded-lg bg-[var(--teal)] text-white h-14 px-4 text-lg font-bold tracking-wide hover:bg-[var(--orange)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--orange)] transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
