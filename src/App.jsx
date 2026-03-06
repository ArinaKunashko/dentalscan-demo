import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DentalScanDemoApp from "./DentalScanDemoApp.js";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DentalScanDemoApp />
    </>
  )
}

export default App
