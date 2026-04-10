export type DemandStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'FINANCED';

export interface Demand {
  id: number;
  reference: string;
  exporterId: string;
  exporterName: string;
  currency: string;
  amount: number;
  status: DemandStatus;
  billOfLading?: string;
  invoiceNumber?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDemandRequest {
  exporterId: string;
  exporterName: string;
  currency: string;
  amount: number;
  billOfLading?: string;
  invoiceNumber?: string;
  description?: string;
}
