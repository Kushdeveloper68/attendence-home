import React, { useState } from 'react';
import { submitStudentReportApi } from '../apis/API';
function StudentReportForm({ parsedUser = {} }) {
  const [subject, setSubject] = useState('');
  const [reason, setReason] = useState('');

// ...existing code...
const handleSubmit = async (e) => {
  e.preventDefault();
  const reportData = {
    name: parsedUser.name,
    enrollmentNumber: parsedUser.enrollmentNumber,
    semester: parsedUser.semester,
    subject,
    reason,
  };
  try {
    const res = await submitStudentReportApi(reportData);
    alert(res.message || 'Report submitted!');
    setSubject('');
    setReason('');
  } catch (err) {
    alert('Error submitting report');
  }
};

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <div>
        <label className='block text-sm font-medium text-gray-700' htmlFor='name'>Name</label>
        <input
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal focus:ring-teal sm:text-sm bg-gray-100'
          id='name'
          type='text'
          value={parsedUser.name}
          readOnly
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700' htmlFor='enrollment'>Enrollment Number</label>
        <input
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal focus:ring-teal sm:text-sm bg-gray-100'
          id='enrollment'
          type='text'
          value={parsedUser.enrollmentNumber}
          readOnly
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700' htmlFor='subject'>Subject</label>
        <input
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal focus:ring-teal sm:text-sm'
          id='subject'
          type='text'
          placeholder='Enter Subject Name'
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700' htmlFor='semester'>Semester</label>
        <input
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal focus:ring-teal sm:text-sm bg-gray-100'
          id='semester'
          type='text'
          value={parsedUser.semester}
          readOnly
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700' htmlFor='reason'>Reason</label>
        <textarea
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal focus:ring-teal sm:text-sm'
          id='reason'
          placeholder='Please provide a valid reason...'
          rows={4}
          value={reason}
          onChange={e => setReason(e.target.value)}
        ></textarea>
      </div>
      <button className='btn btn-student-primary w-full' type='submit'>
        Submit Report
      </button>
    </form>
  );
}

export default StudentReportForm;