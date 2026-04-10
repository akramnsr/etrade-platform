import { UserRole } from '../types';

export const API_ROUTES = {
  DEMANDS: '/api/demands',
  FINANCING: '/api/financing',
  DOCUMENTS: '/api/documents',
  DECISIONS: '/api/decisions',
} as const;

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'MAD', 'XOF'] as const;

export const DEMAND_TYPES = [
  { value: 'BILL_PURCHASE', label: 'Bill Purchase' },
  { value: 'IMPORT_LOAN', label: 'Import Loan' },
  { value: 'EXPORT_CREDIT', label: 'Export Credit' },
  { value: 'LETTER_OF_CREDIT', label: 'Letter of Credit' },
  { value: 'BANK_GUARANTEE', label: 'Bank Guarantee' },
] as const;

export const STATUS_COLORS: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  SUBMITTED: 'bg-blue-100 text-blue-700',
  UNDER_REVIEW: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
};

export const USER_ROLES: Record<UserRole, string> = {
  [UserRole.EXPORTATOR]: 'Exportator',
  [UserRole.BANK_AGENT]: 'Bank Agent',
  [UserRole.ADMIN]: 'Administrator',
};
