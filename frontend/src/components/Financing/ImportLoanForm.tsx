import React, { useState } from 'react';
import { CURRENCIES } from '../../utils/constants';

const ImportLoanForm: React.FC = () => {
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    durationDays: '',
    purpose: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Import loan logic to be implemented
    console.log('Import loan data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <select
            value={formData.currency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
        <input
          type="number"
          value={formData.durationDays}
          onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
        <textarea
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          rows={3}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
      >
        Request Import Loan
      </button>
    </form>
  );
};

export default ImportLoanForm;
