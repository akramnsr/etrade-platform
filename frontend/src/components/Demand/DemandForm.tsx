import React, { useState } from 'react';
import { CreateDemandDto } from '../../types';
import { CURRENCIES, DEMAND_TYPES } from '../../utils/constants';

interface DemandFormProps {
  initialValues?: Partial<CreateDemandDto>;
  onSubmit: (data: CreateDemandDto) => Promise<void>;
  onCancel?: () => void;
}

const DemandForm: React.FC<DemandFormProps> = ({ initialValues = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState<CreateDemandDto>({
    type: initialValues.type ?? '',
    amount: initialValues.amount ?? 0,
    currency: initialValues.currency ?? 'USD',
    description: initialValues.description ?? '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateDemandDto, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateDemandDto, string>> = {};
    if (!form.type) newErrors.type = 'Type is required';
    if (!form.amount || form.amount <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (!form.currency) newErrors.currency = 'Currency is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setIsSubmitting(false);
    }
  };

  const set = (field: keyof CreateDemandDto) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: field === 'amount' ? Number(e.target.value) : e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <select value={form.type} onChange={set('type')} className="input-field">
          <option value="">Select type</option>
          {DEMAND_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        {errors.type && <p className="mt-1 text-xs text-red-600">{errors.type}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input type="number" min="0.01" step="0.01" value={form.amount} onChange={set('amount')} className="input-field" />
          {errors.amount && <p className="mt-1 text-xs text-red-600">{errors.amount}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <select value={form.currency} onChange={set('currency')} className="input-field">
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea value={form.description} onChange={set('description')} rows={3} className="input-field" placeholder="Optional description" />
      </div>
      <div className="flex gap-3 justify-end">
        {onCancel && <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>}
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Saving…' : 'Save Demand'}
        </button>
      </div>
    </form>
  );
};

export default DemandForm;
