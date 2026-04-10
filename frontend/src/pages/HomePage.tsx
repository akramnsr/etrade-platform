import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import { useAuth } from '../hooks/useAuth';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Welcome to eTrade Platform
          </h1>
          <p className="text-xl text-gray-600">
            Export Bill Purchase Digital Financing — PORTNET Morocco
          </p>
          {user && <p className="mt-2 text-blue-600">Hello, {user.name}!</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link
            to="/demands"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-blue-900 mb-2">📋 Demands</h2>
            <p className="text-gray-600">Create and manage export financing demands</p>
          </Link>
          <Link
            to="/financing"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-blue-900 mb-2">💰 Financing</h2>
            <p className="text-gray-600">Bill purchase and import loan operations</p>
          </Link>
          <Link
            to="/dashboard"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-blue-900 mb-2">📊 Dashboard</h2>
            <p className="text-gray-600">Analytics and reporting</p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
