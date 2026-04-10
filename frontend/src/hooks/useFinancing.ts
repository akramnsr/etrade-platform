import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllFinancingRequests,
  getFinancingRequestById,
  createFinancingRequest,
  updateFinancingStatus,
} from '../services/financingService';
import { CreateFinancingDto } from '../types';

export const useFinancingRequests = () => {
  return useQuery({
    queryKey: ['financing'],
    queryFn: getAllFinancingRequests,
  });
};

export const useFinancingRequest = (id: string) => {
  return useQuery({
    queryKey: ['financing', id],
    queryFn: () => getFinancingRequestById(id),
    enabled: !!id,
  });
};

export const useCreateFinancingRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateFinancingDto) => createFinancingRequest(dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['financing'] }),
  });
};

export const useUpdateFinancingStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateFinancingStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['financing'] }),
  });
};
