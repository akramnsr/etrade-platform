import { useState } from 'react';
import { Demand, CreateDemandRequest } from '../types/demand';
import { demandService } from '../services/demandService';
import { toast } from 'react-toastify';

export const useDemand = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDemand = async (data: CreateDemandRequest): Promise<Demand | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const demand = await demandService.create(data);
      toast.success('Demand created successfully!');
      return demand;
    } catch (err) {
      const message = 'Failed to create demand';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const submitDemand = async (id: number): Promise<Demand | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const demand = await demandService.submit(id);
      toast.success('Demand submitted for review!');
      return demand;
    } catch (err) {
      const message = 'Failed to submit demand';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createDemand, submitDemand, isLoading, error };
};
