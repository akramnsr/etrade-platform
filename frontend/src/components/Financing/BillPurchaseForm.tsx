import React, { useState } from 'react';
import { CreateFinancingDto } from '../../types';

interface BillPurchaseFormProps {
  onSubmit: (dto: CreateFinancingDto) => Promise<void>;
  onCancel?: () => void;
}

const BillPurchaseForm: React.FC<BillPurchaseFormProps> = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState<CreateFinancingDto>({
    demandId: '',
    billAmount: 0,
    interestRate: 0,
    durationMonths: 12,
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (field: keyof CreateFinancingDto) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: ['billAmount', 'interestRate', 'durationMonths'].includes(field) ? Number(e.target.value) : e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Bill Purchase Financing</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Demand ID</label>
        <input type="text" value={form.demandId} onChange={set('demandId')} className="input-field" placeholder="Demand UUID" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bill Amount</label>
          <input type="number" min="0.01" step="0.01" value={form.billAmount} onChange={set('billAmount')} className="input-field" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
          <input type="number" min="0" max="100" step="0.01" value={form.interestRate} onChange={set('interestRate')} className="input-field" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
        <input type="number" min="1" max="360" value={form.durationMonths} onChange={set('durationMonths')} className="input-field" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea value={form.notes} onChange={set('notes')} rows={2} className="input-field" />
      </div>
      <div className="flex gap-3 justify-end">
        {onCancel && <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>}
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Submitting…' : 'Submit Request'}
        </button>
      </div>
    </form>
  );
};

export default BillPurchaseForm;
