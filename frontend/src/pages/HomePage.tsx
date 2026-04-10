import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const features = [
  { title: 'Trade Demands', description: 'Create and track export/import trade demands easily.' },
  { title: 'Bill Financing', description: 'Access bill purchase and import loan financing from partner banks.' },
  { title: 'Document Management', description: 'Upload and manage trade documents securely.' },
  { title: 'Real-time Decisions', description: 'Get fast decisions from bank agents on your requests.' },
];

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-16">
      <section className="text-center py-20 bg-gradient-to-br from-primary-50 to-white">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">eTrade Platform</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Streamline your international trade finance operations with our secure, modern platform.
        </p>
        {isAuthenticated ? (
          <Link to="/dashboard" className="btn-primary text-base px-6 py-3">Go to Dashboard</Link>
        ) : (
          <Link to="/login" className="btn-primary text-base px-6 py-3">Get Started</Link>
        )}
      </section>
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ title, description }) => (
            <div key={title} className="card hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
