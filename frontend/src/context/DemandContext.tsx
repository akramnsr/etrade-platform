import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Demand } from '../types/demand';
import { demandService } from '../services/demandService';

interface DemandContextType {
  demands: Demand[];
  isLoading: boolean;
  error: string | null;
  fetchDemands: () => Promise<void>;
  selectedDemand: Demand | null;
  setSelectedDemand: (demand: Demand | null) => void;
}

const DemandContext = createContext<DemandContextType | undefined>(undefined);

export const DemandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);

  const fetchDemands = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await demandService.getAll();
      setDemands(data.content);
    } catch (err) {
      setError('Failed to fetch demands');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DemandContext.Provider
      value={{ demands, isLoading, error, fetchDemands, selectedDemand, setSelectedDemand }}
    >
      {children}
    </DemandContext.Provider>
  );
};

export const useDemandContext = (): DemandContextType => {
  const context = useContext(DemandContext);
  if (!context) {
    throw new Error('useDemandContext must be used within a DemandProvider');
  }
  return context;
};
