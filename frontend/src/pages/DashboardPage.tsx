import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import ExportatorDashboard from '../components/Dashboard/ExportatorDashboard';
import BankDashboard from '../components/Dashboard/BankDashboard';
import AdminDashboard from '../components/Dashboard/AdminDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case UserRole.ADMIN:
      return <AdminDashboard />;
    case UserRole.BANK_AGENT:
      return <BankDashboard />;
    case UserRole.EXPORTATOR:
    default:
      return <ExportatorDashboard />;
  }
};

export default DashboardPage;
