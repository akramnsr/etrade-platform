import { z } from 'zod';

export const demandSchema = z.object({
  exporterId: z.string().min(1, 'Exporter ID is required'),
  exporterName: z.string().min(1, 'Exporter name is required'),
  currency: z.string().length(3, 'Currency must be 3 characters'),
  amount: z.number().positive('Amount must be positive'),
  billOfLading: z.string().optional(),
  invoiceNumber: z.string().optional(),
  description: z.string().optional(),
});

export const financingSchema = z.object({
  demandId: z.number().positive('Demand ID is required'),
  amount: z.number().positive('Amount must be positive'),
  interestRate: z.number().positive('Interest rate must be positive'),
  durationDays: z.number().int().positive('Duration must be positive'),
  currency: z.string().length(3, 'Currency must be 3 characters'),
});

export type DemandFormData = z.infer<typeof demandSchema>;
export type FinancingFormData = z.infer<typeof financingSchema>;
