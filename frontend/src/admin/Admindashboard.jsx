
import {AdminNavbar} from './components';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen font-[Inter,sans-serif] bg-[#f6f7f8] dark:bg-[#111921] text-[#111827] dark:text-[#f9fafb]">
      {/* Sidebar */}
      <AdminNavbar/>
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#111827] dark:text-[#f9fafb]">
            Dashboard
          </h2>
          <div className="flex items-center space-x-4">
            <p className="font-semibold">Admin</p>
            <div className="w-10 h-10 rounded-full bg-[#197fe6] flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Total Students", value: "250" },
            { title: "Total Teachers", value: "30" },
            { title: "Attendance Overview", value: "92%", color: "#197fe6" },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-[#ffffff] dark:bg-[#1f2937] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-[#6b7280] dark:text-[#9ca3af] font-semibold">
                {card.title}
              </h3>
              <p
                className={`text-4xl font-bold mt-2 ${
                  card.color ? "text-[#197fe6]" : "text-[#111827] dark:text-[#f9fafb]"
                }`}
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Attendance Summary */}
        <div className="mt-8 bg-[#ffffff] dark:bg-[#1f2937] p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#111827] dark:text-[#f9fafb] mb-4">
            Attendance Summary
          </h3>
          <div className="h-64 flex items-end space-x-4 md:space-x-6 lg:space-x-8">
            {[
              { day: "Mon", height: "70%" },
              { day: "Tue", height: "95%" },
              { day: "Wed", height: "80%" },
              { day: "Thu", height: "60%" },
              { day: "Fri", height: "90%" },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center space-y-2">
                <div
                  className="w-full bg-[#f6f7f8] dark:bg-[#111921] rounded-t-lg"
                  style={{ height: bar.height }}
                >
                  <div className="bg-[#197fe6] w-full h-full rounded-t-lg"></div>
                </div>
                <span className="text-sm font-medium text-[#6b7280] dark:text-[#9ca3af]">
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#111827] dark:text-[#f9fafb] mb-4">
            Quick Access
          </h3>
          <div className="flex flex-wrap gap-4">
            {["Students", "Teachers", "Attendance Check"].map((btn, i) => (
              <button
                key={i}
                className="px-6 py-3 bg-[#197fe6] text-white font-semibold rounded-lg shadow-md hover:bg-[#1369c7] transition-colors duration-300 flex-grow sm:flex-grow-0"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
