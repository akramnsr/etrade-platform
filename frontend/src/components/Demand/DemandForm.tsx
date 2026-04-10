import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { demandSchema, DemandFormData } from '../../utils/validators';
import { CURRENCIES } from '../../utils/constants';
import { useDemand } from '../../hooks/useDemand';
import Spinner from '../Common/Spinner';

interface DemandFormProps {
  onSuccess?: () => void;
}

const DemandForm: React.FC<DemandFormProps> = ({ onSuccess }) => {
  const { createDemand, isLoading } = useDemand();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemandFormData>({
    resolver: zodResolver(demandSchema),
  });

  const onSubmit = async (data: DemandFormData) => {
    const demand = await createDemand(data);
    if (demand) {
      reset();
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Exporter ID</label>
        <input
          {...register('exporterId')}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
        {errors.exporterId && <p className="text-red-600 text-xs mt-1">{errors.exporterId.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Exporter Name</label>
        <input
          {...register('exporterName')}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
        {errors.exporterName && (
          <p className="text-red-600 text-xs mt-1">{errors.exporterName.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <select
            {...register('currency')}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.currency && <p className="text-red-600 text-xs mt-1">{errors.currency.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.amount && <p className="text-red-600 text-xs mt-1">{errors.amount.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bill of Lading</label>
        <input
          {...register('billOfLading')}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
        <input
          {...register('invoiceNumber')}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading && <Spinner size="sm" />}
        Create Demand
      </button>
    </form>
  );
};

export default DemandForm;
