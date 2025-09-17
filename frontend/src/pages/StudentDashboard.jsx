import "../styles/student.css"

import {Navbar, Footer, ProfileCard} from '../components/';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useApi} from "../apis/API"

export default function StudentDashboard () {
  const api = useApi()
  const navigator = useNavigate();
    const user = localStorage.getItem("student")|| localStorage.getItem("teacher");
    const token = localStorage.getItem("token");
useEffect(() => {
  if(!user && !token) navigator("/");
     const role = JSON.parse(user)?.role;
     if (role !== "student") {
      navigator("/");
     }
   }, [user])
  return (
    <div className='relative flex min-h-screen flex-col bg-gray-100 font-poppins'>
      {/* Header */}
      
      <Navbar />
     
      {/* Main */}
      <main className='flex-grow container mx-auto px-6 py-8'>
        <h2 className='text-3xl font-bold text-navy mb-8'>Student Dashboard</h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-8'>
            {/* Profile Card */}

            <ProfileCard user={user} />
            {/* Actions & Attendance */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='card p-6 flex flex-col items-center justify-center text-center'>
                <h4 className='text-xl font-bold text-navy mb-4'>
                  Quick Actions
                </h4>
                <div className='flex flex-col sm:flex-row gap-4 w-full'>
                  <button className='btn btn-student-primary w-full'>
                    <span className='material-symbols-outlined'>
                      qr_code_scanner
                    </span>
                    Scan QR
                  </button>
                  <button className='btn btn-student-secondary w-full'>
                    <span className='material-symbols-outlined'>
                      upload_file
                    </span>
                    Upload QR
                  </button>
                </div>
              </div>
              <div className='card p-6 flex flex-col items-center justify-center'>
                <h4 className='text-xl font-bold text-navy mb-4'>
                  Attendance Progress
                </h4>
                <div className='relative w-32 h-32'>
                  <svg className='w-full h-full' viewBox='0 0 36 36'>
                    <path
                      className='text-gray-200'
                      d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                      fill='none'
                      strokeWidth='3'
                    ></path>
                    <path
                      className='text-teal'
                      d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
                      fill='none'
                      strokeDasharray='85, 100'
                      strokeLinecap='round'
                      strokeWidth='3'
                    ></path>
                  </svg>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span className='text-3xl font-bold text-navy'>85%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Use */}
            <div className='card p-6'>
              <h3 className='text-2xl font-bold text-navy mb-6'>How to Use</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {[
                  'Scan QR',
                  'Upload QR',
                  'View Attendance',
                  'Report Issue'
                ].map((step, idx) => (
                  <div key={idx} className='flex items-start gap-4'>
                    <div
                      className={`${
                        idx % 2 === 0 ? 'bg-teal' : 'bg-orange'
                      } text-white rounded-full p-3 flex-shrink-0`}
                    >
                      <span className='material-symbols-outlined'>
                        {idx === 0 && 'qr_code_scanner'}
                        {idx === 1 && 'upload_file'}
                        {idx === 2 && 'analytics'}
                        {idx === 3 && 'edit_document'}
                      </span>
                    </div>
                    <div>
                      <h5 className='font-bold text-lg text-gray-800'>
                        Step {idx + 1}: {step}
                      </h5>
                      <p className='text-gray-600 text-sm'>
                        {idx === 0 &&
                          "Use the 'Scan QR' button to scan the code from your instructor."}
                        {idx === 1 &&
                          'Alternatively, upload a saved QR code image.'}
                        {idx === 2 &&
                          'Track your attendance progress on the dashboard.'}
                        {idx === 3 &&
                          'Submit a temporary attendance report if you have a valid reason.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-8'>
            <div className='card p-6'>
              <h3 className='text-2xl font-bold text-navy mb-6'>
                Temporary Attendance Report
              </h3>
              <form className='space-y-4'>
                <div>
                  <label
                    className='block text-sm font-medium text-gray-700'
                    htmlFor='name'
                  >
                    Name
                  </label>
                  <input
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal focus:ring-teal sm:text-sm bg-gray-100'
                    id='name'
                    type='text'
                    value='Sophia Carter'
                    readOnly
                  />
                </div>
                <div>
                  <label
                    className='block text-sm font-medium text-gray-700'
                    htmlFor='enrollment'
                  >
                    Enrollment Number
                  </label>
                  <input
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal focus:ring-teal sm:text-sm bg-gray-100'
                    id='enrollment'
                    type='text'
                    value='2021CS001'
                    readOnly
                  />
                </div>
                <div>
                  <label
                    className='block text-sm font-medium text-gray-700'
                    htmlFor='subject'
                  >
                    Subject
                  </label>
                  <select
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal focus:ring-teal sm:text-sm'
                    id='subject'
                  >
                    <option>Select Subject</option>
                    <option>Data Structures</option>
                    <option>Algorithms</option>
                    <option>Database Management</option>
                  </select>
                </div>
                <div>
                  <label
                    className='block text-sm font-medium text-gray-700'
                    htmlFor='semester'
                  >
                    Semester
                  </label>
                  <input
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal focus:ring-teal sm:text-sm bg-gray-100'
                    id='semester'
                    type='text'
                    value='4'
                    readOnly
                  />
                </div>
                <div>
                  <label
                    className='block text-sm font-medium text-gray-700'
                    htmlFor='reason'
                  >
                    Reason
                  </label>
                  <textarea
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal focus:ring-teal sm:text-sm'
                    id='reason'
                    placeholder='Please provide a valid reason...'
                    rows={4}
                  ></textarea>
                </div>
                <button className='btn btn-student-primary w-full' type='submit'>
                  Submit Report
                </button>
              </form>
            </div>
            <div className='card p-6 bg-navy text-white'>
              <h3 className='text-xl font-bold mb-4'>Terms & Conditions</h3>
              <p className='text-gray-300 text-sm'>
                Please adhere to the university's attendance policy. Misuse of
                the system may lead to disciplinary action. Ensure all temporary
                attendance reports are submitted with valid proof within 24
                hours.
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer/>
    </div>
  )
}
