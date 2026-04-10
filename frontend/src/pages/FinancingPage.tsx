import React, { useState } from 'react';
import { useFinancingRequests, useCreateFinancingRequest } from '../hooks/useFinancing';
import BillList from '../components/Financing/BillList';
import BillPurchaseForm from '../components/Financing/BillPurchaseForm';
import { CreateFinancingDto } from '../types';

const FinancingPage: React.FC = () => {
  const { data: requests = [], isLoading } = useFinancingRequests();
  const createMutation = useCreateFinancingRequest();
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (dto: CreateFinancingDto) => {
    await createMutation.mutateAsync(dto);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Financing Requests</h1>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Request'}
        </button>
      </div>
      {showForm && (
        <div className="card">
          <BillPurchaseForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}
      <div className="card p-0 overflow-hidden">
        <BillList requests={requests} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default FinancingPage;
