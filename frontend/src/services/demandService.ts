import api from './api';
import { Demand, CreateDemandRequest } from '../types/demand';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const demandService = {
  getAll: async (page = 0, size = 10) => {
    const response = await api.get<ApiResponse<{ content: Demand[]; totalElements: number }>>(
      `/api/v1/demands?page=${page}&size=${size}`
    );
    return response.data.data;
  },

  getById: async (id: number): Promise<Demand> => {
    const response = await api.get<ApiResponse<Demand>>(`/api/v1/demands/${id}`);
    return response.data.data;
  },

  getByExporter: async (exporterId: string): Promise<Demand[]> => {
    const response = await api.get<ApiResponse<Demand[]>>(`/api/v1/demands/exporter/${exporterId}`);
    return response.data.data;
  },

  create: async (demand: CreateDemandRequest): Promise<Demand> => {
    const response = await api.post<ApiResponse<Demand>>('/api/v1/demands', demand);
    return response.data.data;
  },

  update: async (id: number, demand: Partial<CreateDemandRequest>): Promise<Demand> => {
    const response = await api.put<ApiResponse<Demand>>(`/api/v1/demands/${id}`, demand);
    return response.data.data;
  },

  submit: async (id: number): Promise<Demand> => {
    const response = await api.post<ApiResponse<Demand>>(`/api/v1/demands/${id}/submit`);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/v1/demands/${id}`);
  },
};
