import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-8xl font-bold text-primary-600 mb-4">404</h1>
    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
    <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
    <Link to="/" className="btn-primary">Return to Home</Link>
  </div>
);

export default NotFoundPage;
