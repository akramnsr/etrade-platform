import api from './api';
import { FinancingRequest, CreateFinancingDto } from '../types';

export const getAllFinancingRequests = async (): Promise<FinancingRequest[]> => {
  const { data } = await api.get<FinancingRequest[]>('/api/financing');
  return data;
};

export const getFinancingRequestById = async (id: string): Promise<FinancingRequest> => {
  const { data } = await api.get<FinancingRequest>(`/api/financing/${id}`);
  return data;
};

export const createFinancingRequest = async (dto: CreateFinancingDto): Promise<FinancingRequest> => {
  const { data } = await api.post<FinancingRequest>('/api/financing', dto);
  return data;
};

export const updateFinancingStatus = async (id: string, status: string): Promise<FinancingRequest> => {
  const { data } = await api.put<FinancingRequest>(`/api/financing/${id}/status`, { status });
  return data;
};
