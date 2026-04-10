export enum DemandStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export interface Demand {
  id: string;
  reference: string;
  exportatorId?: string;
  type: string;
  amount: number;
  currency: string;
  status: DemandStatus;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateDemandDto {
  type: string;
  amount: number;
  currency: string;
  description?: string;
}

export interface UpdateDemandDto extends Partial<CreateDemandDto> {
  status?: DemandStatus;
}
