import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function ProfileCard({ user }) {
  const location = useLocation();
  const path = location.pathname;
  const [parsedUser, setParsedUser] = React.useState(null);

  useEffect(() => {
    if (typeof user === "string") {
      try {
        setParsedUser(JSON.parse(user));
      } catch (err) {
        console.error("Invalid user JSON:", err);
        setParsedUser(null); 
      }
    } else {
      setParsedUser(user || null); // agar object already aaya ho
    }
  }, [user]);
 
  switch (path) {
    case "/studentdashboard":
      return  (
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
                    {parsedUser.name}
                  </h3>
                  <p className='text-gray-600'>
                    Branch:{' '}
                    <span className='font-medium text-gray-800'>
                      {parsedUser.branch}
                    </span>
                  </p>
                  <p className='text-gray-600'>
                    Semester:{' '}
                    <span className='font-medium text-gray-800'>{parsedUser.semester}</span>
                  </p>
                  <p className='text-gray-600'>
                    Enrollment No:{' '}
                    <span className='font-medium text-gray-800'>{parsedUser.enrollmentNumber}</span>
                  </p>
                </div>
              </div>
            </div>
      )
      break;
    
    default:
      return ( <div className="card p-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3a3YcnKCMJw42lboj-CDj4f_GGdkQZ4TddijGDlw5yt4Zwup1--G9pClBSc3-MwtpF8Rrajiy1cbv5pEL_e7zAPYNJOJeNcxUaSeR_Zv58CuXSePsJDtaXJeunrsHRsdV7HvkdXbbNu5fTAQ-wJgXOpYhTRuz7BP22NJ35c9umS9ltmyJVvKTbMpRXLnBKLaGTpKYgGgtjqqRVuumUsNXrnV8d9qj_cZDSwpgMLkoZ7A79h6221wVQld96l-AkxFR03acQdyNEw")`
                    }}>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy">{parsedUser.name}</h3>
                    <p className="text-gray-600">Branch: <span className="font-medium text-gray-800">{parsedUser.branch}</span></p>
                    <p className="text-gray-600">Unique No: <span className="font-medium text-gray-800">{parsedUser.uniqueId}</span></p>
                  </div>
                </div>
              </div>);
      break;
  }
}

export default ProfileCard