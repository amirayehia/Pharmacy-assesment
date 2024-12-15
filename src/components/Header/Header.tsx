import { BeakerIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="h-20 bg-darkgreen rounded-full w-5/6 m-auto mt-2 flex justify-between items-center">
      <div className="flex items-center">
        <BeakerIcon className="text-light w-12 ms-7" />
        <span className="text-light font-bold ms-3">HealthLife</span>
      </div>
      <ul className="header-container flex items-center me-7 text-light font-bold">
        <li className="me-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-lightgreen' : 'text-light'
            }
          >
            Medicine List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? 'text-lightgreen' : 'text-light'
            }
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
