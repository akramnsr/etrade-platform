export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
export const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8180';
export const KEYCLOAK_REALM = import.meta.env.VITE_KEYCLOAK_REALM || 'etrade';
export const KEYCLOAK_CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'etrade-frontend';

export const DEMAND_STATUSES = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  FINANCED: 'Financed',
} as const;

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'MAD'] as const;
export const DOCUMENT_TYPES = [
  'BILL_OF_LADING',
  'INVOICE',
  'LETTER_OF_CREDIT',
  'INSURANCE',
  'CERTIFICATE_OF_ORIGIN',
  'OTHER',
] as const;
