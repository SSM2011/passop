import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-800 text-white">
      <div className="container mx-auto flex justify-around items-center px-4 py-4 h-16">
        {/* Logo */}
        <div className="logo font-bold text-white text-3xl">
          <span className="text-green-700">&lt;</span>Pass
          <span className="text-green-700">OP/&gt;</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`flex-col md:flex-row md:flex space-x-6 text-sm ${
            isOpen ? 'flex' : 'hidden'
          } md:space-x-6 md:items-center`}
        >
          <li>
            <NavLink
              to="/manager"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-500 font-semibold underline'
                  : 'hover:text-green-500 transition'
              }
            >
              Manager
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/password-generator"
              className={({ isActive }) =>
                isActive
                  ? 'text-green-500 font-semibold underline'
                  : 'hover:text-green-500 transition'
              }
            >
              Password Generator
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
