import React, { useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const storedUserData = localStorage.getItem('userData')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 flex justify-between items-center bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl whitespace-nowrap dark:text-white font-bold">
            HopeHelps
          </span>
        </Link>
        {/* Hamburger Menu */}
        <div
          className={`md:hidden text-center border rounded-md absolute left-0 top-16 h-50 bg-gray-800 w-60 transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <ul className="flex flex-col justify-center h-full">
          <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>

              <Link
                to="/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/donate-now"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Donate
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </Link>
            </li>
           {
            !storedUserData ?<>
            <li>
                  <Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Sign Up
                  </Link>
                </li>
            </>:
              <Link onClick={()=>  {localStorage.clear(); window.location.reload() } } className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Logout
             </Link>
           }
                
           
          </ul>
        </div>
      </div>
      
      <div className="block md:hidden">
        <button className="text-white" onClick={toggleMenu}>
          <FaBars className="text-3xl" />
        </button>
      </div>
      
      {/* Navbar Links */}
      <div className="hidden md:flex items-center">
        <ul className="flex">
        <li>
              <Link
                to="/"
                className=" bg-blue-700 rounded md:bg-transparent md:text-blue-700 mr-6 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white mr-6 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/donate-now"
                className="text-white mr-6 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Donate
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white mr-6 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </Link>
            </li>
           
        </ul>
        
        {/* User Dropdown */}
        <button className="text-white" onClick={toggleDropdown}>
          <FaUserCircle className="text-3xl" />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-48 w-48 bg-white border rounded-lg shadow-lg py-2">
            <ul>
              {
                 !storedUserData ?<>
                 <Link to='/login'>
              <li className="px-4 py-2 hover:bg-gray-200">Login</li>
              </Link>
              <Link to='/signup'>
              <li className="px-4 py-2 hover:bg-gray-200">Signup</li>
              </Link>
                 </>:
                 <Link onClick={()=>  {localStorage.clear(); window.location.reload() } } className="px-4 py-2 hover:bg-gray-200">
                 Logout
                </Link>
              }
              
              
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
