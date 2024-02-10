// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Header from './component/header/Header'
import AppRouter from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Header/>
        <AppRouter />
      </BrowserRouter>

    </>
  )
}

export default App
