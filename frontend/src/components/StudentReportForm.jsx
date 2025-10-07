import React from 'react'

function StudentReportForm({parsedUser = {}}) {
  return (
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
                    value={parsedUser.name}
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
                    value={parsedUser.enrollmentNumber}
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
                    value={parsedUser.semester}
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
  )
}

export default StudentReportForm