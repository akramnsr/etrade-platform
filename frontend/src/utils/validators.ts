import { CreateDemandDto } from '../types';

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Invalid email address';
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || !value.trim()) return `${fieldName} is required`;
  return null;
};

export const validateAmount = (amount: number): string | null => {
  if (amount === undefined || amount === null) return 'Amount is required';
  if (isNaN(amount) || amount <= 0) return 'Amount must be a positive number';
  if (amount > 999_999_999) return 'Amount exceeds maximum allowed value';
  return null;
};

export interface DemandFormErrors {
  type?: string;
  amount?: string;
  currency?: string;
  description?: string;
}

export const validateDemandForm = (form: Partial<CreateDemandDto>): DemandFormErrors => {
  const errors: DemandFormErrors = {};
  const typeError = validateRequired(form.type ?? '', 'Type');
  if (typeError) errors.type = typeError;
  const amountError = validateAmount(form.amount ?? 0);
  if (amountError) errors.amount = amountError;
  const currencyError = validateRequired(form.currency ?? '', 'Currency');
  if (currencyError) errors.currency = currencyError;
  return errors;
};
