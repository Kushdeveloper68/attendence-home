import React from 'react'
import {useLocation} from "react-router-dom"
function Footer() {
  const location = useLocation();
  switch (location.pathname) {
    case "/teacherdashboard":
        return ( <footer className="bg-white mt-12">
          <div className="container mx-auto px-6 lg:px-10 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6 md:mb-0">
                <a className="text-[var(--light-text)] hover:text-[var(--primary-teal)] transition-colors" href="#">About
                  Us</a>
                <a className="text-[var(--light-text)] hover:text-[var(--primary-teal)] transition-colors"
                  href="#">Contact</a>
                <a className="text-[var(--light-text)] hover:text-[var(--primary-teal)] transition-colors" href="#">Privacy
                  Policy</a>
                <a className="text-[var(--light-text)] hover:text-[var(--primary-teal)] transition-colors" href="#">Terms of
                  Service</a>
              </div>
              <div className="flex justify-center gap-4 mb-6 md:mb-0">
                <a className="text-[var(--light-text)] hover:text-[var(--primary-navy)] transition-colors" href="#">
                  <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clipRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      fillRule="evenodd"></path>
                  </svg>
                </a>
                <a className="text-[var(--light-text)] hover:text-[var(--primary-navy)] transition-colors" href="#">
                  <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                    </path>
                  </svg>
                </a>
                <a className="text-[var(--light-text)] hover:text-[var(--primary-navy)] transition-colors" href="#">
                  <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clipRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm-1.161 1.043c-1.049.048-1.688.21-2.228.42a3.836 3.836 0 00-1.385.886 3.836 3.836 0 00-.886 1.385c-.21 1.049-.372 1.688-.42 2.228-.048 1.024-.06 1.357-.06 3.659s.012 2.635.06 3.659c.048 1.049.21 1.688.42 2.228a3.836 3.836 0 00.886 1.385 3.836 3.836 0 001.385.886c1.049.21 1.688.372 2.228.42 1.024.048 1.357.06 3.659.06s2.635-.012 3.659-.06c1.049-.048 1.688-.21 2.228-.42a3.836 3.836 0 001.385-.886 3.836 3.836 0 00.886-1.385c.21-1.049.372-1.688.42-2.228.048-1.024.06-1.357.06-3.659s-.012-2.635-.06-3.659c-.048-1.049-.21-1.688-.42-2.228a3.836 3.836 0 00-.886-1.385 3.836 3.836 0 00-1.385-.886c-1.049-.21-1.688-.372-2.228-.42-1.024-.048-1.357-.06-3.659-.06s-2.635.012-3.659.06zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 1.802a3.333 3.333 0 110 6.666 3.333 3.333 0 010-6.666zm5.338-3.205a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
                      fillRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-center text-[var(--light-text)] text-sm pt-4 border-t border-gray-200">
              <p>© 2024 EduTrack. All rights reserved.</p>
            </div>
          </div>
        </footer>);
      break;
      case "/studentdashboard":
 return (<footer className='bg-white mt-12'>
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
      </footer>);
      break;
      case "/markattendance":
         return ( <footer className="bg-white mt-auto">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-[var(--gray-600)]">
          © 2024 EduTrack. All Rights Reserved.
        </div>
      </footer>);
      break;

    case "/generateqr":
        return (<footer className="bg-white border-t border-[var(--light-gray-200)] mt-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 text-sm">
              © 2024 EduTrack. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Contact Us"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-gray-500 hover:text-[var(--teal-500)] text-sm font-medium"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>);
      break;

    default:
        break;
  }
}

export default Footer