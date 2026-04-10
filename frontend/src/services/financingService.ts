import api from './api';
import { Financing, CreateFinancingRequest } from '../types/financing';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const financingService = {
  getAll: async (): Promise<Financing[]> => {
    const response = await api.get<ApiResponse<Financing[]>>('/api/v1/financings');
    return response.data.data;
  },

  getById: async (id: number): Promise<Financing> => {
    const response = await api.get<ApiResponse<Financing>>(`/api/v1/financings/${id}`);
    return response.data.data;
  },

  create: async (financing: CreateFinancingRequest): Promise<Financing> => {
    const response = await api.post<ApiResponse<Financing>>('/api/v1/financings', financing);
    return response.data.data;
  },
};
