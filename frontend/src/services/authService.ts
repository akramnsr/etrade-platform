import api from './api';
import { User } from '../types/user';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const authService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/api/v1/auth/me');
    return response.data.data;
  },
};
