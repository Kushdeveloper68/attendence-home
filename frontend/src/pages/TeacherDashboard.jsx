import React, {useEffect, useState} from "react";
import "../styles/teacher.css"
import {Navbar, Footer, ProfileCard} from '../components';
import { useNavigate } from 'react-router-dom';
import { useApi } from "../apis/API"

export default function TeacherDashboard() {
   const api = useApi()
  const navigator = useNavigate();
  const [parsedUser, setParsedUser] = useState({})
  const user = localStorage.getItem("student") || localStorage.getItem("teacher");
  const token = localStorage.getItem("token");
  
console.log("user in teacherdashboard", user);
console.log("token in teacherdashboard", token);
    useEffect(() => {
      if (!user && !token) navigator("/");
      const role = JSON.parse(user)?.role;
      setParsedUser(JSON.parse(user));
      if (role !== "teacher") {
        navigator("/");
      }
    }, [user])

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden bg-[var(--light-gray)]" style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <Navbar />  
        
        {/* Main */}
        <main className="container mx-auto px-6 lg:px-10 py-8">
          <h2 className="text-3xl font-bold text-[var(--dark-text)] mb-8">Teacher Dashboard</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Card */}
             <ProfileCard/>
              {/* QR Code Card */}
              <div className="card p-6 flex flex-col md:flex-row items-center gap-6 bg-[var(--primary-navy)] text-white">
                <div className="flex-shrink-0">
                  <img alt="QR Code Illustration" className="h-48 w-48 object-cover rounded-lg"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnZKP_67N4TUBXqPUBmykhS-bE3JGZjoa4owGGaa52mG-ulLfhDTA3tZL-2ag0Wzjs469mZMmITaFoWynz3PMkZDw4sLH-4y8qgOi6_JuEKvQwR86jO4swfR58joqFPIHZIpgz6RtVumil37fQaQs7PTYmB6TdCMN3Qo08JeSu5hAu-1E__OdpOZZ9_cSreL1miygCyNij840SF2f7spINxxKhpelyyV5C27Z9nuj3k_MyGFbbqwaslOMmmwv4_orKmVQOoieKYw" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Generate Attendance QR Code</h3>
                  <p className="text-gray-200 mb-6">Quickly generate a QR code for your class attendance. Students can scan it
                    to mark their presence.</p>
                  <button 
                  onClick={() => navigator("/generateqr")}
                    className="btn-primary font-semibold py-3 px-6 rounded-lg inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                    <span className="material-symbols-outlined">qr_code_2</span>
                    Generate QR Code
                  </button>
                </div>
              </div>
              {/* Report Form Card */}
              <div className="card p-6">
                <h3 className="text-xl font-bold text-[var(--dark-text)] mb-4">Teacher Report Form</h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-base font-medium text-[var(--dark-text)]" htmlFor="name">Name</label>
                    <input
                      className="mt-1 form-input w-full rounded-lg border-gray-300 focus:border-[var(--primary-teal)] focus:ring focus:ring-[var(--primary-teal)] focus:ring-opacity-50 transition"
                      id="name" type="text" />
                  </div>
                  <div>
                    <label className="text-base font-medium text-[var(--dark-text)]" htmlFor="email">Email</label>
                    <input
                      className="mt-1 form-input w-full rounded-lg border-gray-300 focus:border-[var(--primary-teal)] focus:ring focus:ring-[var(--primary-teal)] focus:ring-opacity-50 transition"
                      id="email" type="email" />
                  </div>
                  <div>
                    <label className="text-base font-medium text-[var(--dark-text)]" htmlFor="problem">Problem</label>
                    <textarea
                      className="mt-1 form-textarea w-full rounded-lg border-gray-300 focus:border-[var(--primary-teal)] focus:ring focus:ring-[var(--primary-teal)] focus:ring-opacity-50 transition"
                      id="problem" placeholder="Describe the issue you are facing" rows={4}></textarea>
                  </div>
                  <div className="text-right">
                    <button
                      className="bg-[var(--primary-navy)] text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-800 transition-colors"
                      type="submit">Submit Report</button>
                  </div>
                </form>
              </div>
              {/* Terms & Conditions Card */}
              <div className="card relative overflow-hidden">
                <img alt="Legal documents" className="absolute inset-0 h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0Z7U1ohCjO30PAQO4VdQZZoDyjKTfY-FG7fCJ97M8hc0kVK5apc-AIAauQA-pS9tgo72TbeBSXTpwGu5hH2GU0w9sU2-02gHoxeO9H_F5vr_aBwl6s5n9FHAXtNTJ5ZZ8Cc2bNkRK9MPt4yKZ_oJINJA7m1mcI8MqPlwF6-9wgePO5jlwpV828uUadTqYpFMqPlYd-O9FtmgmhZKabDu2qKwWfXsWTtH2HC0KVdUSr5ezHO15apc3ZMSS5o9X5JSCUniynYnqxw" />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative p-6 flex flex-col justify-end h-48">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Terms &amp; Conditions</h3>
                    <p className="text-gray-200 mb-4">Please read our terms and conditions carefully before using the
                      platform.</p>
                    <button
                      className="bg-white text-[var(--primary-navy)] font-semibold py-2 px-5 rounded-lg hover:bg-gray-100 transition-colors">View
                      Terms</button>
                  </div>
                </div>
              </div>
            </div>
            {/* How to Use Card */}
            <div className="lg:col-span-1 space-y-8">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-[var(--dark-text)] mb-4">How to Use</h3>
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-24 w-24 rounded-lg bg-cover bg-center"
                      style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDO7-h0h2aXCEUHXI-yVy9cv65AXb_bMfq3VxwzF-GG0zCE3ZUQmbRD3B9BA0KsupeJ8_P4xUKa8iQNd0b1qsnp9Mr4ujdeshXzFcv0IsEP0b1EubqoRDEINTgWPSsd3k6O3mUbyG8fddUZgIaTbkv2JaURJRTLCPjoWMlCpfmeJkMy60jv3u8mTzwGQ9QPWZODHToKmE0EfPQRYA4GQiOTAKq_oAEmKvq-yB4p15_Gjc3JSnMkvnX8DcXPfS1F3WGPQNy-3SiTdQ")`
                      }}>
                    </div>
                    <div>
                      <p className="font-bold text-[var(--dark-text)]">Step 1: Generate QR Code</p>
                      <p className="text-sm text-[var(--light-text)]">Click the 'Generate QR Code' button to create a unique
                        code for your class.</p>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-24 w-24 rounded-lg bg-cover bg-center"
                      style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAL-ZQ0Z3Vf-N2_ll40Mz0BdwzVKD66Y3lryvjoA8e5Jl7oaNShd60IlXRhQxbdlO5McPTe-3PR-yd1Sa1PNq9eCIigVN_JofGgyYRoB_6Yd5_u9I0t7irzD6GYuErVEf5YRUrN2CipEK0fqdWD63exO9oFmLznHtbemCu64YqZUbGbNuyDqno1FzD-_VIKhdOvfKoDUjcYDbSj7MNPLpErqqQlQ_r1c3FkYEm18l17ThIfft4zMLZgPUC-eBjYN2sFhEyiOupkdA")`
                      }}>
                    </div>
                    <div>
                      <p className="font-bold text-[var(--dark-text)]">Step 2: Share with Students</p>
                      <p className="text-sm text-[var(--light-text)]">Display the QR code on your screen or share it via email
                        or messaging.</p>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-24 w-24 rounded-lg bg-cover bg-center"
                      style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBubb0f-HaJEj7RO_BrGxxaUXEzeDNuCr-X5LoHPLosR6DrIhWyHZvwA7HoF4jdXPyujPC1CyZfWL-fxGwGUuZifDsSvlG2ZZTtDk-sBMTuMxaJodBMEH7psbLNyBjF1I0P8Qy93OlVV4UG7NAjCemhyPYsYJ4ZE9FKvLSewNoezkvGQ9d2jlZbmiahkQm06-LBJidwaAS9QX-O39EDWDqXP9cik1izXFDQ0-wSOwoe4VkWtfNqXAzBxLzYND0iSAHOkqUG9ITUBA")`
                      }}>
                    </div>
                    <div>
                      <p className="font-bold text-[var(--dark-text)]">Step 3: Track Attendance</p>
                      <p className="text-sm text-[var(--light-text)]">Monitor student attendance in real-time as they scan the
                        QR code.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* Footer */}
       <Footer/>
      </div>
      </div>
  );
}