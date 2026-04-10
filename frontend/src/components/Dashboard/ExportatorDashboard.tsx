import React from 'react';
import { Link } from 'react-router-dom';
import { useDemands } from '../../hooks/useDemand';
import { DemandStatus } from '../../types';
import Spinner from '../Common/Spinner';

const ExportatorDashboard: React.FC = () => {
  const { data: demands = [], isLoading } = useDemands();

  const stats = {
    total: demands.length,
    draft: demands.filter((d) => d.status === DemandStatus.DRAFT).length,
    submitted: demands.filter((d) => d.status === DemandStatus.SUBMITTED).length,
    approved: demands.filter((d) => d.status === DemandStatus.APPROVED).length,
  };

  const cards = [
    { label: 'Total Demands', value: stats.total, color: 'bg-blue-50 text-blue-700' },
    { label: 'Draft', value: stats.draft, color: 'bg-gray-50 text-gray-700' },
    { label: 'Submitted', value: stats.submitted, color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Approved', value: stats.approved, color: 'bg-green-50 text-green-700' },
  ];

  if (isLoading) return <Spinner className="py-12" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Exportator Dashboard</h1>
        <Link to="/demands/new" className="btn-primary">+ New Demand</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(({ label, value, color }) => (
          <div key={label} className={`card ${color}`}>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent Demands</h2>
        {demands.slice(0, 5).length === 0 ? (
          <p className="text-gray-500">No demands yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {demands.slice(0, 5).map((d) => (
              <li key={d.id} className="py-3 flex justify-between items-center">
                <span className="text-sm font-mono">{d.reference}</span>
                <span className="badge bg-gray-100 text-gray-700">{d.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExportatorDashboard;
