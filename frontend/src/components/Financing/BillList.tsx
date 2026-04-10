import React from 'react';
import { FinancingRequest } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import Spinner from '../Common/Spinner';

interface BillListProps {
  requests: FinancingRequest[];
  isLoading?: boolean;
}

const BillList: React.FC<BillListProps> = ({ requests, isLoading }) => {
  if (isLoading) return <Spinner className="py-12" />;
  if (!requests.length) return <div className="text-center py-12 text-gray-500">No financing requests found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Bill Amount', 'Interest Rate', 'Duration', 'Status', 'Created'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((r) => (
            <tr key={r.id}>
              <td className="px-4 py-3 text-sm">{formatCurrency(r.billAmount, 'USD')}</td>
              <td className="px-4 py-3 text-sm">{(r.interestRate * 100).toFixed(2)}%</td>
              <td className="px-4 py-3 text-sm">{r.durationMonths} months</td>
              <td className="px-4 py-3 text-sm">
                <span className="badge bg-blue-100 text-blue-700">{r.status}</span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">{formatDate(r.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillList;
