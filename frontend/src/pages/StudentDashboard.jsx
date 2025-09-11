import "../styles/student.css"


export default function StudentDashboard () {
  return (
    <div className='relative flex min-h-screen flex-col bg-gray-100 font-poppins'>
      {/* Header */}
      <header className='bg-white shadow-sm sticky top-0 z-50'>
        <nav className='container mx-auto px-6 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <svg
              className='h-8 w-8 text-teal'
              fill='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z'></path>
            </svg>
            <h1 className='text-2xl font-bold text-navy'>EduTrack</h1>
          </div>
          <div className='hidden md:flex items-center gap-8 font-medium text-gray-600'>
            <a className='hover:text-teal' href='#'>
              Dashboard
            </a>
            <a className='hover:text-teal' href='#'>
              Attendance
            </a>
            <a className='hover:text-teal' href='#'>
              Courses
            </a>
            <a className='hover:text-teal' href='#'>
              Profile
            </a>
          </div>
          <div className='flex items-center gap-4'>
            <div className='relative group'>
              <button className='flex items-center gap-2 focus:outline-none'>
                <div
                  className='w-10 h-10 rounded-full bg-cover bg-center'
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3a3YcnKCMJw42lboj-CDj4f_GGdkQZ4TddijGDlw5yt4Zwup1--G9pClBSc3-MwtpF8Rrajiy1cbv5pEL_e7zAPYNJOJeNcxUaSeR_Zv58CuXSePsJDtaXJeunrsHRsdV7HvkdXbbNu5fTAQ-wJgXOpYhTRuz7BP22NJ35c9umS9ltmyJVvKTbMpRXLnBKLaGTpKYgGgtjqqRVuumUsNXrnV8d9qj_cZDSwpgMLkoZ7A79h6221wVQld96l-AkxFR03acQdyNEw")'
                  }}
                ></div>
                <span className='font-semibold text-gray-800 hidden md:block'>
                  Sophia C.
                </span>
                <span className='material-symbols-outlined text-gray-600'>
                  expand_more
                </span>
              </button>
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block'>
                <a
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  href='#'
                >
                  My Profile
                </a>
                <a
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  href='#'
                >
                  Settings
                </a>
                <a
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  href='#'
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Main */}
      <main className='flex-grow container mx-auto px-6 py-8'>
        <h2 className='text-3xl font-bold text-navy mb-8'>Student Dashboard</h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-8'>
            {/* Profile Card */}
            <div className='card p-6'>
              <div className='flex items-center gap-6'>
                <div
                  className='w-24 h-24 rounded-full bg-cover bg-center flex-shrink-0'
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3a3YcnKCMJw42lboj-CDj4f_GGdkQZ4TddijGDlw5yt4Zwup1--G9pClBSc3-MwtpF8Rrajiy1cbv5pEL_e7zAPYNJOJeNcxUaSeR_Zv58CuXSePsJDtaXJeunrsHRsdV7HvkdXbbNu5fTAQ-wJgXOpYhTRuz7BP22NJ35c9umS9ltmyJVvKTbMpRXLnBKLaGTpKYgGgtjqqRVuumUsNXrnV8d9qj_cZDSwpgMLkoZ7A79h6221wVQld96l-AkxFR03acQdyNEw")'
                  }}
                ></div>
                <div>
                  <h3 className='text-2xl font-bold text-navy'>
                    Sophia Carter
                  </h3>
                  <p className='text-gray-600'>
                    Branch:{' '}
                    <span className='font-medium text-gray-800'>
                      Computer Science
                    </span>
                  </p>
                  <p className='text-gray-600'>
                    Semester:{' '}
                    <span className='font-medium text-gray-800'>4</span>
                  </p>
                  <p className='text-gray-600'>
                    Enrollment No:{' '}
                    <span className='font-medium text-gray-800'>2021CS001</span>
                  </p>
                </div>
              </div>
            </div>

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
      <footer className='bg-white mt-12'>
        <div className='container mx-auto px-6 py-8'>
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <div className='flex items-center gap-2'>
              <svg
                className='h-6 w-6 text-teal'
                fill='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z'></path>
              </svg>
              <span className='text-lg font-bold text-navy'>EduTrack</span>
            </div>
            <div className='flex gap-6 mt-4 md:mt-0 text-gray-600'>
              <a className='hover:text-teal' href='#'>
                About
              </a>
              <a className='hover:text-teal' href='#'>
                Contact
              </a>
              <a className='hover:text-teal' href='#'>
                Privacy
              </a>
              <a className='hover:text-teal' href='#'>
                Terms
              </a>
            </div>
            <div className='flex gap-4 mt-4 md:mt-0'>
              <a className='text-gray-500 hover:text-teal' href='#'>
                <svg
                  aria-hidden='true'
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    clipRule='evenodd'
                    d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                    fillRule='evenodd'
                  ></path>
                </svg>
              </a>
              <a className='text-gray-500 hover:text-teal' href='#'>
                <svg
                  aria-hidden='true'
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'></path>
                </svg>
              </a>{' '}
              <a className='text-gray-500 hover:text-teal' href='#'>
                <svg
                  aria-hidden='true'
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  {' '}
                  <path
                    clipRule='evenodd'
                    d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.667 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.668-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z'
                    fillRule='evenodd'
                  ></path>{' '}
                </svg>
              </a>{' '}
            </div>{' '}
          </div>{' '}
          <div className='mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500'>
            {' '}
            <p>© 2024 EduTrack. All rights reserved.</p>{' '}
          </div>{' '}
        </div>{' '}
      </footer>{' '}
    </div>
  )
}
