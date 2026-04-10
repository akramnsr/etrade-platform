import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold text-primary-700">
              eTrade
            </Link>
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-6">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-sm font-medium ${isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/demands"
                  className={({ isActive }) =>
                    `text-sm font-medium ${isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`
                  }
                >
                  Demands
                </NavLink>
                <NavLink
                  to="/financing"
                  className={({ isActive }) =>
                    `text-sm font-medium ${isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`
                  }
                >
                  Financing
                </NavLink>
              </nav>
            )}
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <span className="text-sm text-gray-600">
                  {user.username} <span className="badge bg-primary-100 text-primary-700">{user.role}</span>
                </span>
                <button onClick={handleLogout} className="btn-secondary text-sm">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary text-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
