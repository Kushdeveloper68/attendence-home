import { useState } from 'react'
import './App.css'
import { Scanner } from '@yudiel/react-qr-scanner';
import {GenerateQR, MarkAttendance} from "./components"
import {Login, Signup, StudentDashboard, TeacherDashboard} from './pages';
import {StudentAdminPage, TeacherAdminPage, AdminDashboard, AttendanceReport} from "./admin"
import {BrowserRouter , Router , Routes, Route} from "react-router-dom"
import { AuthProvider } from './context/authcontext';
function App() {
  const [count, setCount] = useState(0)
const handleScan = (data) => {
    if (data) {
      console.log('Scanned QR Code:', data);
    }
  };
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/generateqr" element={<GenerateQR />} />
        <Route path="/markattendance" element={<MarkAttendance />} />
         {/*admin routes */}
        <Route path="/admin">
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<StudentAdminPage />} />
          <Route path="teachers" element={<TeacherAdminPage />} />
          <Route path="attendance-report" element={<AttendanceReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
