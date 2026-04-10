import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const { hasRole } = useAuth();

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${isActive ? 'bg-blue-700' : 'hover:bg-gray-700'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/demands"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${isActive ? 'bg-blue-700' : 'hover:bg-gray-700'}`
          }
        >
          Demands
        </NavLink>
        <NavLink
          to="/financing"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${isActive ? 'bg-blue-700' : 'hover:bg-gray-700'}`
          }
        >
          Financing
        </NavLink>
        {(hasRole('ADMIN') || hasRole('BANK_OFFICER')) && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${isActive ? 'bg-blue-700' : 'hover:bg-gray-700'}`
            }
          >
            Dashboard
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
