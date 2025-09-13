import React from 'react'
import { Link, Navigate ,useLocation} from 'react-router-dom'

function Navbar() {
    const location = useLocation();
    switch (location.pathname) {
        case '/teacherdashboard':
            return (
                <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between whitespace-nowrap py-4">
              <div className="flex items-center gap-3">
                <svg className="h-8 w-8 text-[var(--primary-teal)]" fill="none" viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd"
                    d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                    fill="currentColor" fillRule="evenodd"></path>
                  <path clipRule="evenodd"
                    d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                    fill="currentColor" fillRule="evenodd"></path>
                </svg>
                <h1 className="text-[var(--dark-text)] text-xl font-bold">EduTrack</h1>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <Link className="text-[var(--dark-text)] text-base font-medium hover:text-[var(--primary-teal)] transition-colors"
                  to="/teacherdashboard">Dashboard</Link>
                <Link className="text-[var(--light-text)] text-base font-medium hover:text-[var(--primary-teal)] transition-colors"
                  to="/courses">Courses</Link>
                <Link className="text-[var(--light-text)] text-base font-medium hover:text-[var(--primary-teal)] transition-colors"
                  to="/attendance">Attendance</Link>
                <Link className="text-[var(--light-text)] text-base font-medium hover:text-[var(--primary-teal)] transition-colors"
                  to="/reports">Reports</Link>
                <Link className="text-[var(--light-text)] text-base font-medium hover:text-[var(--primary-teal)] transition-colors"
                  to="/settings">Settings</Link>
              </nav>
              <div className="flex items-center gap-4">
                <button
                  className="relative rounded-full p-2 text-[var(--light-text)] hover:bg-gray-100 hover:text-[var(--primary-navy)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-teal)] transition-all">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <div className="relative">
                  <button className="flex items-center gap-2">
                    <img alt="Profile" className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu_nwaSyxxwk01AwSEq1CPChFK21_9REKi7yCvq-b3mJ3d_xoyf97CmXA_XW3AHGG8HZoL2BKPIRkxI5DLQrW2FdEjzDVlX-wdNRg1UK6k_O1chJgE-1RKy8wJd6r9a0Lx-9uQ19JVlZJh3gm1uXntJhV9UdLdao-5cawHVUyy-wEUDN2vwYF2MwgZ9oFwl2PlXOaTabwyldMnHirEqESb_uGIWZUXtuMc9xv3j_tCWgSG4upyBHq0iGuJ_0G9wmCAzu2R7yyUSw" />
                    <span className="material-symbols-outlined text-[var(--light-text)]">expand_more</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
            )
            break
            
        case '/studentdashboard':
            return  ( 
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
            <Link className='hover:text-teal' to='#'>
              Dashboard
            </Link>
            <Link className='hover:text-teal' to='#'>
              Attendance
            </Link>
            <Link className='hover:text-teal' to='#'>
              Courses
            </Link>
            <Link className='hover:text-teal' to='#'>
              Profile
            </Link>
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
            )
            break
 
        case '/generateqr':
            return ( 
            <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              className="h-8 w-8 text-[var(--teal-500)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            <h1 className="text-2xl font-bold text-[var(--navy-800)]">
              EduTrack
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Dashboard", "Courses", "Attendance", "Reports", "Settings"].map(
              (item) => (
                <a
                  key={item}
                  className="text-gray-600 hover:text-[var(--teal-500)] font-medium"
                  href="#"
                >
                  {item}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApHsYZKQ_WvhDagDBvbmTcDc-PRoVISKnXf5ZGkmungHivuvQNTnvkV-HPCx_F8XHb1wi7iyOxBAbGJFJ9hekazJ24H9X3SmjXtezfPiNguCBshVjUKBe16ScUY-e8J1-p9n-tuGa7Leeow4VpAudkfEGEtckjioukt2XliIo-Hp8h1AXiQKNPSDyXVV_lExqq8vCbT4PK_tsB7Y9itn4vKYYbXqCcP88qNiHmuUHO_DX-kji4ohB8cfmVAc4AsItiB2ZWcI-f3Q')",
              }}
            />
            <button className="md:hidden text-gray-600 hover:text-[var(--teal-500)]">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </nav>
      </header>
            )
            break

        case '/markattendance':
            return ( 
            <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-[var(--teal-500)]">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.07V15H8v-2h3v-2.07c0-1.39.73-2.64 1.93-3.26C13.56 7.34 14.28 7 15 7v2h-1c-.55 0-1 .45-1 1v2h2l-.5 2h-1.5v2.07C10.97 16.64 9.17 15.65 9 17.07zm4-10.07h2v2h-2v-2z"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[var(--navy-900)]">EduTrack</h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-[var(--gray-600)] hover:text-[var(--teal-500)] transition-colors" href="#">Dashboard</a>
            <a className="text-sm font-medium text-[var(--gray-600)] hover:text-[var(--teal-500)] transition-colors" href="#">Courses</a>
            <a className="text-sm font-bold text-[var(--teal-500)]" href="#">Attendance</a>
            <a className="text-sm font-medium text-[var(--gray-600)] hover:text-[var(--teal-500)] transition-colors" href="#">Profile</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-[var(--gray-600)] hover:text-[var(--teal-500)] transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[var(--orange-500)]"></span>
            </button>
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_yZZqcs5hvU9zEFaHwfgqfiRS787HaD1rIKXTN_IpsY7KDZG3ntmnC9WvUE9BeTtpaJpSDoiNmiwfViUHhfwwXWgH7C-18SrylKN6hWvorEIBRcBpNTkNSR_slhBjFWGvY7ZDIxmaXwC997qg26-CFV1Kidly_2TtlU3vsQpSG6pdhZh2AbdGBbCQh32glGZEmWchnmXr4Fp_F_IlnrRalfcVflKfTp8CsE_YqIl6y6i8i6G9GQMfjYyyvfjZTGOCqffsiZwEdQ")',
              }}
            ></div>
          </div>
        </nav>
      </header>
            )
            break

        default:
            return ( 
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
            )
            break
    }
}

export default Navbar
