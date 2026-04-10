import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          eTrade Platform
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/demands" className="hover:text-blue-200 transition-colors">
            Demands
          </Link>
          <Link to="/financing" className="hover:text-blue-200 transition-colors">
            Financing
          </Link>
          <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
            Dashboard
          </Link>
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue-200">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
