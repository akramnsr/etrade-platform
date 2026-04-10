import React, { useState } from 'react';
import { useDemands, useCreateDemand } from '../hooks/useDemand';
import DemandList from '../components/Demand/DemandList';
import DemandForm from '../components/Demand/DemandForm';
import DemandDetail from '../components/Demand/DemandDetail';
import { Demand, CreateDemandDto } from '../types';

const DemandPage: React.FC = () => {
  const { data: demands = [], isLoading } = useDemands();
  const createMutation = useCreateDemand();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<Demand | null>(null);

  const handleCreate = async (dto: CreateDemandDto) => {
    await createMutation.mutateAsync(dto);
    setShowForm(false);
  };

  if (selected) {
    return <DemandDetail demand={selected} onClose={() => setSelected(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Trade Demands</h1>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Demand'}
        </button>
      </div>
      {showForm && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Create Demand</h2>
          <DemandForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}
      <div className="card p-0 overflow-hidden">
        <DemandList demands={demands} isLoading={isLoading} onSelect={setSelected} />
      </div>
    </div>
  );
};

export default DemandPage;
