import React, { useState } from 'react';
import { submitTeacherReportApi } from '../apis/API';
function TeacherReportForm({ parsedUser = {} }) {
  const [problem, setProblem] = useState('');
// ...existing code...
const handleSubmit = async (e) => {
  e.preventDefault();
  const reportData = {
    name: parsedUser.name,
    email: parsedUser.email,
    problem,
    uniqueId: parsedUser.uniqueid,
  };
  try {
    const res = await submitTeacherReportApi(reportData);
    alert(res.message || 'Report submitted!');
    setProblem('');
  } catch (err) {
    alert('Error submitting report');
  }
};

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-base font-medium text-[var(--dark-text)]" htmlFor="name">Name</label>
        <input
          className="mt-1 form-input w-full rounded-lg border-gray-300 focus:border-[var(--primary-teal)] focus:ring focus:ring-[var(--primary-teal)] focus:ring-opacity-50 transition"
          id="name" type="text"
          placeholder="Enter your name"
          value={parsedUser.name}
          readOnly
        />
      </div>
      <div>
        <label className="text-base font-medium text-[var(--dark-text)]" htmlFor="name">Name</label>
        <input
          className="mt-1 form-input w-full rounded-lg border-gray-300 focus:border-[var(--primary-teal)] focus:ring focus:ring-[var(--primary-teal)] focus:ring-opacity-50 transition"
          id="name" type="text"
          placeholder="Enter your name"
          value={parsedUser.uniqueid}
          readOnly
        />
      </div>
      <div>
        <label className="text-base font-medium text-[var(--dark-text)]" htmlFor="email">Email</label>
        <input
          className="mt-1 form-input w-full rounded-lg border-gray-300 focus:border-[var(--primary-teal)] focus:ring focus:ring-[var(--primary-teal)] focus:ring-opacity-50 transition"
          id="email" type="email"
          value={parsedUser.email}
          readOnly
        />
      </div>
      <div>
        <label className="text-base font-medium text-[var(--dark-text)]" htmlFor="problem">Problem</label>
        <textarea
          className="mt-1 form-textarea w-full rounded-lg border-gray-300 focus:border-[var(--primary-teal)] focus:ring focus:ring-[var(--primary-teal)] focus:ring-opacity-50 transition"
          id="problem" placeholder="Describe the issue you are facing" rows={4}
          value={problem}
          onChange={e => setProblem(e.target.value)}
        ></textarea>
      </div>
      <div className="text-right">
        <button
          className="bg-[var(--primary-navy)] text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-800 transition-colors"
          type="submit">Submit Report</button>
      </div>
    </form>
  );
}

export default TeacherReportForm;