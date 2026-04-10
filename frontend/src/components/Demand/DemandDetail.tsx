import React from 'react';
import { Demand } from '../../types';
import { formatCurrency, formatDate, formatStatus } from '../../utils/formatters';
import { STATUS_COLORS } from '../../utils/constants';

interface DemandDetailProps {
  demand: Demand;
  onClose?: () => void;
}

const DemandDetail: React.FC<DemandDetailProps> = ({ demand, onClose }) => {
  const fields = [
    { label: 'Reference', value: demand.reference },
    { label: 'Type', value: demand.type },
    { label: 'Amount', value: formatCurrency(demand.amount, demand.currency) },
    { label: 'Created', value: formatDate(demand.createdAt) },
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Demand Details</h2>
        <span className={`badge ${STATUS_COLORS[demand.status] ?? 'bg-gray-100 text-gray-700'}`}>
          {formatStatus(demand.status)}
        </span>
      </div>
      <dl className="grid grid-cols-2 gap-4">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-xs font-medium text-gray-500 uppercase">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900">{value}</dd>
          </div>
        ))}
        {demand.description && (
          <div className="col-span-2">
            <dt className="text-xs font-medium text-gray-500 uppercase">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{demand.description}</dd>
          </div>
        )}
      </dl>
      {onClose && (
        <div className="mt-6">
          <button onClick={onClose} className="btn-secondary">Close</button>
        </div>
      )}
    </div>
  );
};

export default DemandDetail;
