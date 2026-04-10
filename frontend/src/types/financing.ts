export type FinancingStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface Financing {
  id: number;
  demandId: number;
  amount: number;
  interestRate: number;
  durationDays: number;
  agios: number;
  netAmount: number;
  startDate: string;
  endDate: string;
  status: FinancingStatus;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFinancingRequest {
  demandId: number;
  amount: number;
  interestRate: number;
  durationDays: number;
  currency: string;
}
