import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Logo from './components/Logo'
import Footer from './components/Footer'


function App() {


  return (
    <>
      <Logo />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
