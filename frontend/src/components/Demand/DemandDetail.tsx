import React from 'react';
import { Demand } from '../../types/demand';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface DemandDetailProps {
  demand: Demand;
  onClose?: () => void;
}

const DemandDetail: React.FC<DemandDetailProps> = ({ demand, onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Demand: {demand.reference}</h2>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Exporter</p>
          <p className="font-medium">{demand.exporterName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="font-medium">{formatCurrency(demand.amount, demand.currency)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-medium">{demand.status}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Bill of Lading</p>
          <p className="font-medium">{demand.billOfLading || '-'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Invoice Number</p>
          <p className="font-medium">{demand.invoiceNumber || '-'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Created At</p>
          <p className="font-medium">{formatDate(demand.createdAt)}</p>
        </div>
      </div>
      {demand.description && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Description</p>
          <p className="mt-1 text-gray-700">{demand.description}</p>
        </div>
      )}
    </div>
  );
};

export default DemandDetail;
