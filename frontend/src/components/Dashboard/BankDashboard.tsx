import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { financingService } from '../../services/financingService';
import Spinner from '../Common/Spinner';
import { formatCurrency } from '../../utils/formatters';

const BankDashboard: React.FC = () => {
  const { data: financings, isLoading } = useFetch(() => financingService.getAll());

  if (isLoading) return <Spinner />;

  const totalFinanced = (financings ?? []).reduce((sum, f) => sum + f.amount, 0);
  const active = (financings ?? []).filter((f) => f.status === 'ACTIVE').length;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bank Operations Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-blue-700">{financings?.length ?? 0}</p>
          <p className="text-sm text-gray-600">Total Financings</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{formatCurrency(totalFinanced, 'USD')}</p>
          <p className="text-sm text-gray-600">Total Financed</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <p className="text-3xl font-bold text-yellow-700">{active}</p>
          <p className="text-sm text-gray-600">Active</p>
        </div>
      </div>
    </div>
  );
};

export default BankDashboard;
