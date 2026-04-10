import api from './api';

interface DecisionDTO {
  id?: number;
  demandId: number;
  result: string;
  score?: number;
  riskLevel?: string;
  comments?: string;
  decidedBy?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const decisionService = {
  getByDemand: async (demandId: number): Promise<DecisionDTO> => {
    const response = await api.get<ApiResponse<DecisionDTO>>(`/api/v1/decisions/demand/${demandId}`);
    return response.data.data;
  },

  makeDecision: async (demandId: number, decision: Partial<DecisionDTO>): Promise<DecisionDTO> => {
    const response = await api.post<ApiResponse<DecisionDTO>>(
      `/api/v1/decisions/demand/${demandId}`,
      decision
    );
    return response.data.data;
  },

  autoScore: async (demandId: number): Promise<DecisionDTO> => {
    const response = await api.post<ApiResponse<DecisionDTO>>(
      `/api/v1/decisions/demand/${demandId}/auto-score`
    );
    return response.data.data;
  },
};
