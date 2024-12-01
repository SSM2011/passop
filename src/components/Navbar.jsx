import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-around items-center px-4 py-4 h-16">
        {/* Logo */}
        <div className="logo font-bold text-white text-3xl">
          <span className="text-green-700">&lt;</span>Pass
          <span className="text-green-700">OP/&gt;</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-sm">
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
