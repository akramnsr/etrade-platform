import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { demandService } from '../../services/demandService';
import Spinner from '../Common/Spinner';

const ExportatorDashboard: React.FC = () => {
  const { data, isLoading } = useFetch(() => demandService.getAll());

  if (isLoading) return <Spinner />;

  const total = data?.totalElements ?? 0;
  const demands = data?.content ?? [];
  const approved = demands.filter((d) => d.status === 'APPROVED').length;
  const pending = demands.filter((d) => ['DRAFT', 'SUBMITTED', 'UNDER_REVIEW'].includes(d.status)).length;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Export Demands</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-blue-700">{total}</p>
          <p className="text-sm text-gray-600">Total Demands</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-green-700">{approved}</p>
          <p className="text-sm text-gray-600">Approved</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-yellow-700">{pending}</p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
      </div>
    </div>
  );
};

export default ExportatorDashboard;
