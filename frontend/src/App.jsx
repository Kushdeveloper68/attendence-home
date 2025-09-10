import { useState } from 'react'
import './App.css'
import { Scanner } from '@yudiel/react-qr-scanner';
import {Login, Signup} from './pages';

function App() {
  const [count, setCount] = useState(0)
const handleScan = (data) => {
    if (data) {
      console.log('Scanned QR Code:', data);
    }
  };
  return (
    <>
    <Signup />
    </>
  )
}

export default App
