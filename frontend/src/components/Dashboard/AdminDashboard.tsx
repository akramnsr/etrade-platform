import React from 'react';
import { useDemands } from '../../hooks/useDemand';
import { useFinancingRequests } from '../../hooks/useFinancing';
import Spinner from '../Common/Spinner';

const AdminDashboard: React.FC = () => {
  const { data: demands = [], isLoading: loadingDemands } = useDemands();
  const { data: financing = [], isLoading: loadingFinancing } = useFinancingRequests();

  if (loadingDemands || loadingFinancing) return <Spinner className="py-12" />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card bg-purple-50 text-purple-700">
          <p className="text-2xl font-bold">{demands.length}</p>
          <p className="text-sm mt-1">Total Demands</p>
        </div>
        <div className="card bg-blue-50 text-blue-700">
          <p className="text-2xl font-bold">{financing.length}</p>
          <p className="text-sm mt-1">Financing Requests</p>
        </div>
        <div className="card bg-green-50 text-green-700">
          <p className="text-2xl font-bold">{demands.filter((d) => d.status === 'APPROVED').length}</p>
          <p className="text-sm mt-1">Approved</p>
        </div>
        <div className="card bg-red-50 text-red-700">
          <p className="text-2xl font-bold">{demands.filter((d) => d.status === 'REJECTED').length}</p>
          <p className="text-sm mt-1">Rejected</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">System Overview</h2>
          <dl className="space-y-2">
            <div className="flex justify-between text-sm">
              <dt className="text-gray-500">Active Demands</dt>
              <dd className="font-medium">{demands.filter((d) => !['CANCELLED', 'REJECTED'].includes(d.status)).length}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-gray-500">Pending Financing</dt>
              <dd className="font-medium">{financing.filter((f) => f.status === 'PENDING').length}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
