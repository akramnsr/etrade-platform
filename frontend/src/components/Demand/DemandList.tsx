import React from 'react';
import { Demand } from '../../types/demand';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { DEMAND_STATUSES } from '../../utils/constants';

interface DemandListProps {
  demands: Demand[];
  onSelect?: (demand: Demand) => void;
}

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  SUBMITTED: 'bg-blue-100 text-blue-700',
  UNDER_REVIEW: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
  FINANCED: 'bg-purple-100 text-purple-700',
};

const DemandList: React.FC<DemandListProps> = ({ demands, onSelect }) => {
  if (demands.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No demands found</p>
        <p className="text-sm mt-1">Create your first demand to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Reference', 'Exporter', 'Amount', 'Status', 'Created'].map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {demands.map((demand) => (
            <tr
              key={demand.id}
              onClick={() => onSelect?.(demand)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">
                {demand.reference}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {demand.exporterName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatCurrency(demand.amount, demand.currency)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[demand.status] || 'bg-gray-100 text-gray-700'}`}
                >
                  {DEMAND_STATUSES[demand.status as keyof typeof DEMAND_STATUSES] || demand.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(demand.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DemandList;
