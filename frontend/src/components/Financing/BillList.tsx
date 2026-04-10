import React from 'react';
import { Financing } from '../../types/financing';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface BillListProps {
  financings: Financing[];
}

const BillList: React.FC<BillListProps> = ({ financings }) => {
  if (financings.length === 0) {
    return <div className="text-center py-8 text-gray-400">No financing records found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['ID', 'Amount', 'Rate', 'Duration', 'Agios', 'Net Amount', 'Status'].map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {financings.map((f) => (
            <tr key={f.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{f.id}</td>
              <td className="px-4 py-3 text-sm">{formatCurrency(f.amount, f.currency)}</td>
              <td className="px-4 py-3 text-sm">{(f.interestRate * 100).toFixed(2)}%</td>
              <td className="px-4 py-3 text-sm">{f.durationDays} days</td>
              <td className="px-4 py-3 text-sm">{formatCurrency(f.agios, f.currency)}</td>
              <td className="px-4 py-3 text-sm">{formatCurrency(f.netAmount, f.currency)}</td>
              <td className="px-4 py-3 text-sm">{f.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillList;
