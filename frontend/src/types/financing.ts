export interface FinancingRequest {
  id: string;
  demandId: string;
  bankAgentId?: string;
  billAmount: number;
  interestRate: number;
  durationMonths: number;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateFinancingDto {
  demandId: string;
  billAmount: number;
  interestRate: number;
  durationMonths: number;
  notes?: string;
}
