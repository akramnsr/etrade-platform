import React from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import { useAuth } from '../hooks/useAuth';
import ExportatorDashboard from '../components/Dashboard/ExportatorDashboard';
import BankDashboard from '../components/Dashboard/BankDashboard';
import AdminDashboard from '../components/Dashboard/AdminDashboard';

const DashboardPage: React.FC = () => {
  const { hasRole } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        {hasRole('ADMIN') ? (
          <AdminDashboard />
        ) : hasRole('BANK_OFFICER') ? (
          <BankDashboard />
        ) : (
          <ExportatorDashboard />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
