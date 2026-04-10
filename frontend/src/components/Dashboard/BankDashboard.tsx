import React from 'react';
import { useDemands } from '../../hooks/useDemand';
import { useFinancingRequests } from '../../hooks/useFinancing';
import { DemandStatus } from '../../types';
import Spinner from '../Common/Spinner';

const BankDashboard: React.FC = () => {
  const { data: demands = [], isLoading: loadingDemands } = useDemands();
  const { data: financing = [], isLoading: loadingFinancing } = useFinancingRequests();

  const pending = demands.filter((d) => d.status === DemandStatus.UNDER_REVIEW).length;
  const pendingFinancing = financing.filter((f) => f.status === 'PENDING').length;

  if (loadingDemands || loadingFinancing) return <Spinner className="py-12" />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Bank Agent Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="card bg-orange-50 text-orange-700">
          <p className="text-2xl font-bold">{pending}</p>
          <p className="text-sm mt-1">Pending Reviews</p>
        </div>
        <div className="card bg-blue-50 text-blue-700">
          <p className="text-2xl font-bold">{pendingFinancing}</p>
          <p className="text-sm mt-1">Pending Financing</p>
        </div>
        <div className="card bg-green-50 text-green-700">
          <p className="text-2xl font-bold">{demands.filter((d) => d.status === DemandStatus.APPROVED).length}</p>
          <p className="text-sm mt-1">Approved</p>
        </div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Demands Under Review</h2>
        {demands.filter((d) => d.status === DemandStatus.UNDER_REVIEW).length === 0 ? (
          <p className="text-gray-500">No demands under review.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {demands.filter((d) => d.status === DemandStatus.UNDER_REVIEW).slice(0, 5).map((d) => (
              <li key={d.id} className="py-3 flex justify-between items-center">
                <span className="text-sm font-mono">{d.reference}</span>
                <span className="text-sm text-gray-500">{d.type}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BankDashboard;
