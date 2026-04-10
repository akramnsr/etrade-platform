import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const links = [
    { to: '/dashboard', label: 'Dashboard', roles: [UserRole.EXPORTATOR, UserRole.BANK_AGENT, UserRole.ADMIN] },
    { to: '/demands', label: 'Demands', roles: [UserRole.EXPORTATOR, UserRole.BANK_AGENT, UserRole.ADMIN] },
    { to: '/financing', label: 'Financing', roles: [UserRole.BANK_AGENT, UserRole.ADMIN] },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <nav className="space-y-1">
        {links
          .filter((link) => !user || link.roles.includes(user.role))
          .map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
