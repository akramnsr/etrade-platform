import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-700">eTrade Platform</h1>
        <p className="text-gray-500 mt-2">Sign in to your account</p>
      </div>
      <div className="card">
        <LoginForm />
      </div>
    </div>
  </div>
);

export default LoginPage;
