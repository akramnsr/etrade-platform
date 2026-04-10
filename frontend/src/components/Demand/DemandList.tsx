import React, { useState } from 'react';
import { Demand } from '../../types';
import { formatCurrency, formatDate, formatStatus } from '../../utils/formatters';
import { STATUS_COLORS } from '../../utils/constants';
import Spinner from '../Common/Spinner';

interface DemandListProps {
  demands: Demand[];
  isLoading?: boolean;
  onSelect?: (demand: Demand) => void;
}

const PAGE_SIZE = 10;

const DemandList: React.FC<DemandListProps> = ({ demands, isLoading, onSelect }) => {
  const [page, setPage] = useState(1);
  const total = demands.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const paginated = demands.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (isLoading) return <Spinner className="py-12" />;

  if (!demands.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        No demands found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Reference', 'Type', 'Amount', 'Status', 'Created'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginated.map((demand) => (
            <tr
              key={demand.id}
              onClick={() => onSelect?.(demand)}
              className={onSelect ? 'cursor-pointer hover:bg-gray-50' : ''}
            >
              <td className="px-4 py-3 text-sm font-mono text-gray-900">{demand.reference}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{demand.type}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{formatCurrency(demand.amount, demand.currency)}</td>
              <td className="px-4 py-3">
                <span className={`badge ${STATUS_COLORS[demand.status] ?? 'bg-gray-100 text-gray-700'}`}>
                  {formatStatus(demand.status)}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">{formatDate(demand.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {pages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary text-xs px-3 py-1">Prev</button>
          <span className="text-sm text-gray-600">{page} / {pages}</span>
          <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages} className="btn-secondary text-xs px-3 py-1">Next</button>
        </div>
      )}
    </div>
  );
};

export default DemandList;
