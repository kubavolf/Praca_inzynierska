import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const [isVisible, setMenuVisible] = useState(false); //domyślnie na false, menu nie jest otwarte

  const toggleMenu = () => {
    setMenuVisible(!isVisible); //funkcja zmienia wartość isVisible na przeciwną
  };

  const navLinks = () => (
    <>
      <li className='link'><Link to="/shop">Aktualne ogłoszenia</Link></li>
      <li className='link'><Link to="/about">O firmie</Link></li>
      <li className='link'><Link to="/contact">Kontakt</Link></li>
    </>
  )


  return (
    <header className='fixed-nav-bar w-nav mb-5 bg-violet-400'>
      <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
        {/* md:collapse, ikonka widoczna tylko na średnich bądź małych urządzeniach, collapse zeby nie zmienialo ukladu po zniknieciu */}
        <div className='md:collapse'>
          <button onClick={toggleMenu} className='text-white-2x1'>
            <i className='ri-menu-line'></i>
          </button>
        </div>

        {/* Element ukryty na każdym ekranie, sm:flex uwidacznia go na punkcie granicznym sm i większym */}

        <ul className='hidden sm:flex space-x-6 '>
          {navLinks()}
        </ul>

        {/* Ikonki */}
        <div className='icons_element relative'>

          <span>
            <Link to="/search">
              {/* dodanie elementu z REMIX */}
              <i className="ri-search-eye-line hover:text-purple-600"></i>
            </Link>
          </span>


          <span>
            <Link to="login">
              <i className='ri-user-line'></i>
            </Link>
          </span>


        </div>
      </nav>

      {/* Rozwijanie Menu, otwierane przyciksiem. jak isVisible jest true to wyświetla menu*/}
      {isVisible && (
        <ul className='sm:hidden bg-violet-400 flex flex-col space-y-4 mt-4 px-4'>
          {navLinks()}
        </ul>

      )}
    </header>
  )
}

export default Navbar

