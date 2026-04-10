import api from './api';

export interface Decision {
  id: string;
  demandId: string;
  agentId?: string;
  decision: 'APPROVED' | 'REJECTED' | 'PENDING';
  comments?: string;
  decidedAt?: string;
}

export const getAllDecisions = async (): Promise<Decision[]> => {
  const { data } = await api.get<Decision[]>('/api/decisions');
  return data;
};

export const getDecisionsByDemandId = async (demandId: string): Promise<Decision[]> => {
  const { data } = await api.get<Decision[]>(`/api/decisions/demand/${demandId}`);
  return data;
};

export const createDecision = async (decision: Partial<Decision>): Promise<Decision> => {
  const { data } = await api.post<Decision>('/api/decisions', decision);
  return data;
};
