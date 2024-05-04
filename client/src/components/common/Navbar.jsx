import React, { useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" p-4 flex justify-between items-center bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex items-center">
        {/* Logo */}
        <div className="text-white font-bold text-xl mr-4">HopeHelps</div>
        {/* Navbar Links */}
        <div className={`md:hidden ${isMenuOpen ? '' : 'hidden'} absolute left-0 top-0 h-full bg-gray-800 w-56`}>
          <ul className="flex flex-col justify-center h-full">
            <li className="text-white my-4">Home</li>
            <li className="text-white my-4">About</li>
            <li className="text-white my-4">Contact</li>
            <li className="text-white my-4">Donate</li>
            <li className="text-white my-4">Login</li>
            <li className="text-white my-4">Signup</li>
            <li className="text-white my-4">Logout</li>
          </ul>
        </div>
      </div>
      {/* Hamburger Menu */}
      <div className="block md:hidden">
        <button className="text-white" onClick={toggleMenu}>
          <FaBars className="text-3xl" />
        </button>
      </div>
      {/* User Dropdown */}
      <div className="hidden md:flex items-center">
        <ul className="flex">
          <li className="text-white mr-6">Home</li>
          <li className="text-white mr-6">About</li>
          <li className="text-white mr-6">Contact</li>
          <li className="text-white mr-6">Donate</li>

        </ul>
        <button className="text-white" onClick={toggleDropdown}>
          <FaUserCircle className="text-3xl" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-48 w-48  bg-white border rounded-lg shadow-lg py-2">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-200">Login</li>
              <li className="px-4 py-2 hover:bg-gray-200">Signup</li>
              <li className="px-4 py-2 hover:bg-gray-200">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
