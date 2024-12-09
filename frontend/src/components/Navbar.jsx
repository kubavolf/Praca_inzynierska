import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useLogoutMutation } from '../store/userApi';
import { logout } from '../store/userSlice';


const Navbar = () => {

  const [isVisible, setMenuVisible] = useState(false); // domyślnie na false, menu nie jest otwarte
  const [isOpen, setIsOpen] = useState(false); // stan dla rozwijanego menu użytkownika

  // Obsługa zalogowanego użytkownika
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.logging);
  console.log(user?.picture);

  const [logoutApi] = useLogoutMutation();

  // mini menu
  const toggleMenu = () => {
    setMenuVisible(!isVisible); //funkcja zmienia wartość isVisible na przeciwną
  };


  // menu użytkownika
  const toggleUserMenu = () => {
    setIsOpen(!isOpen);
  };


  // wylogowanie
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout()); // resetowanie stanu Redux i usunięcie danych użytkownika
      alert('Wylogowano pomyślnie');
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
      alert('Nie udało się wylogować');
    }
    setIsOpen(false);
  };



  // funkcja renderująca menu użytkownika po zalogowaniu
  const renderUserMenu = () => {

    let content; //zawartość menu


    if (user && user.picture) {
      content = (
        <>

          <img
            src={`http://localhost:3000${user?.picture}`}
            className='cursor-pointer size-10 rounded-xl object-scale-down'
            onClick={toggleUserMenu} // Obsługa kliknięcia w avatar
          />

          {isOpen && (
            <ul className="absolute bg-white shadow-xl rounded-xl p-2 right-0 mt-2 ">

              <li className="link p-5 hover:bg-gray-100 rounded-xl text-xs text">
                <Link to="/profile-settings">Ustawienia profilu</Link>
              </li>

              <li className="link p-5 hover:bg-gray-100 rounded-xl text-xs">
                <Link to="/create-post">Stwórz ogłoszenie</Link>
              </li>

              <li className="link p-5 hover:bg-gray-100 rounded-xl cursor-pointer text-red-600"
                onClick={handleLogout}>Wyloguj się
              </li>

            </ul>
          )}
        </>
      );
    } else {
      content = (
        <Link to="login">
          <i className='ri-user-line'></i>
        </Link>
      );
    }

    return content;
  };


  const navLinks = () => (
    <>
      <li className='link'><Link to="/shop">Aktualne ogłoszenia</Link></li>
      <li className='link'><Link to="/about">O firmie</Link></li>
      <li className='link'><Link to="/contact">Kontakt</Link></li>
    </>
  );


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
        <ul className='hidden sm:flex space-x-6'>
          {navLinks()}
        </ul>

        {/* Ikonki */}
        <div className='icons_element relative'>
          <span>
            <Link to="/search">
              <i className="ri-search-eye-line"></i>
            </Link>
          </span>
          <span>
            {renderUserMenu()} {/* Wywołanie funkcji renderującej menu użytkownika */}
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
  );
};

export default Navbar;
