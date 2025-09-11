import { useState } from 'react'
import './App.css'
import { Scanner } from '@yudiel/react-qr-scanner';
import {GenerateQR, MarkAttendance} from "./components"
import {Login, Signup, StudentDashboard, TeacherDashboard} from './pages';
import {BrowserRouter , Router , Routes, Route} from "react-router-dom"
function App() {
  const [count, setCount] = useState(0)
const handleScan = (data) => {
    if (data) {
      console.log('Scanned QR Code:', data);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/generateqr" element={<GenerateQR />} />
        <Route path="/markattendance" element={<MarkAttendance />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
