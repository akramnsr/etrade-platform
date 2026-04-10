import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { financingSchema, FinancingFormData } from '../../utils/validators';
import { useFinancing } from '../../hooks/useFinancing';
import { CURRENCIES } from '../../utils/constants';
import Spinner from '../Common/Spinner';

interface BillPurchaseFormProps {
  demandId: number;
  onSuccess?: () => void;
}

const BillPurchaseForm: React.FC<BillPurchaseFormProps> = ({ demandId, onSuccess }) => {
  const { createFinancing, isLoading } = useFinancing();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FinancingFormData>({
    resolver: zodResolver(financingSchema),
    defaultValues: { demandId },
  });

  const onSubmit = async (data: FinancingFormData) => {
    const financing = await createFinancing(data);
    if (financing) onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      <input type="hidden" {...register('demandId', { valueAsNumber: true })} />
      <div className="grid grid-cols-2 gap-4">
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
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            {...register('interestRate', { valueAsNumber: true })}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.interestRate && (
            <p className="text-red-600 text-xs mt-1">{errors.interestRate.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
          <input
            type="number"
            {...register('durationDays', { valueAsNumber: true })}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.durationDays && (
            <p className="text-red-600 text-xs mt-1">{errors.durationDays.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading && <Spinner size="sm" />}
        Create Financing
      </button>
    </form>
  );
};

export default BillPurchaseForm;
