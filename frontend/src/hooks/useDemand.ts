import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllDemands,
  getDemandById,
  createDemand,
  updateDemand,
  deleteDemand,
} from '../services/demandService';
import { CreateDemandDto, UpdateDemandDto } from '../types';

export const useDemands = () => {
  return useQuery({
    queryKey: ['demands'],
    queryFn: getAllDemands,
  });
};

export const useDemand = (id: string) => {
  return useQuery({
    queryKey: ['demands', id],
    queryFn: () => getDemandById(id),
    enabled: !!id,
  });
};

export const useCreateDemand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateDemandDto) => createDemand(dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['demands'] }),
  });
};

export const useUpdateDemand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateDemandDto }) => updateDemand(id, dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['demands'] }),
  });
};

export const useDeleteDemand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDemand(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['demands'] }),
  });
};
