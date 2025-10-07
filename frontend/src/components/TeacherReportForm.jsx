import React from 'react'

function TeacherReportForm() {
  return (
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
  )
}

export default TeacherReportForm