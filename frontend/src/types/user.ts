export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  roles: string[];
}

export type UserRole = 'ADMIN' | 'BANK_OFFICER' | 'EXPORTER';
