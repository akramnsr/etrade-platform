import { useState } from 'react';
import { Financing, CreateFinancingRequest } from '../types/financing';
import { financingService } from '../services/financingService';
import { toast } from 'react-toastify';

export const useFinancing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createFinancing = async (data: CreateFinancingRequest): Promise<Financing | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const financing = await financingService.create(data);
      toast.success('Financing created successfully!');
      return financing;
    } catch (err) {
      const message = 'Failed to create financing';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createFinancing, isLoading, error };
};
