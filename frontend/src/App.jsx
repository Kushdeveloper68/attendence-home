import { useState } from 'react'
import './App.css'
import { Scanner } from '@yudiel/react-qr-scanner';

function App() {
  const [count, setCount] = useState(0)
const handleScan = (data) => {
    if (data) {
      console.log('Scanned QR Code:', data);
    }
  };
  return (
    <>
    <Scanner onScan={(result) => console.log(result)} />;
    </>
  )
}

export default App
