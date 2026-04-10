import api from './api';
import { Demand, CreateDemandDto, UpdateDemandDto } from '../types';

export const getAllDemands = async (): Promise<Demand[]> => {
  const { data } = await api.get<Demand[]>('/api/demands');
  return data;
};

export const getDemandById = async (id: string): Promise<Demand> => {
  const { data } = await api.get<Demand>(`/api/demands/${id}`);
  return data;
};

export const createDemand = async (dto: CreateDemandDto): Promise<Demand> => {
  const { data } = await api.post<Demand>('/api/demands', dto);
  return data;
};

export const updateDemand = async (id: string, dto: UpdateDemandDto): Promise<Demand> => {
  const { data } = await api.put<Demand>(`/api/demands/${id}`, dto);
  return data;
};

export const deleteDemand = async (id: string): Promise<void> => {
  await api.delete(`/api/demands/${id}`);
};
