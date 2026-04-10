import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Demand } from '../types';
import { getAllDemands, createDemand, updateDemand, deleteDemand } from '../services/demandService';

interface DemandContextValue {
  demands: Demand[];
  isLoading: boolean;
  error: string | null;
  fetchDemands: () => Promise<void>;
  addDemand: (dto: Partial<Demand>) => Promise<Demand>;
  editDemand: (id: string, dto: Partial<Demand>) => Promise<Demand>;
  removeDemand: (id: string) => Promise<void>;
}

const DemandContext = createContext<DemandContextValue | undefined>(undefined);

export function DemandProvider({ children }: { children: React.ReactNode }) {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDemands = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllDemands();
      setDemands(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch demands');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addDemand = useCallback(async (dto: Partial<Demand>): Promise<Demand> => {
    const created = await createDemand(dto as Parameters<typeof createDemand>[0]);
    setDemands((prev) => [...prev, created]);
    return created;
  }, []);

  const editDemand = useCallback(async (id: string, dto: Partial<Demand>): Promise<Demand> => {
    const updated = await updateDemand(id, dto as Parameters<typeof updateDemand>[1]);
    setDemands((prev) => prev.map((d) => (d.id === id ? updated : d)));
    return updated;
  }, []);

  const removeDemand = useCallback(async (id: string) => {
    await deleteDemand(id);
    setDemands((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const value = useMemo<DemandContextValue>(
    () => ({ demands, isLoading, error, fetchDemands, addDemand, editDemand, removeDemand }),
    [demands, isLoading, error, fetchDemands, addDemand, editDemand, removeDemand]
  );

  return <DemandContext.Provider value={value}>{children}</DemandContext.Provider>;
}

export function useDemandContext(): DemandContextValue {
  const context = useContext(DemandContext);
  if (!context) throw new Error('useDemandContext must be used within DemandProvider');
  return context;
}
