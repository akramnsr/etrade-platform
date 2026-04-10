import { UserRole } from '../types';
import { STATUS_COLORS, USER_ROLES } from './constants';

export const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-700';
};

export const getRoleLabel = (role: UserRole): string => {
  return USER_ROLES[role] ?? role;
};

export const truncateText = (text: string, maxLength = 100): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
};

export const generateReference = (): string => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `DEM-${date}-${rand}`;
};
