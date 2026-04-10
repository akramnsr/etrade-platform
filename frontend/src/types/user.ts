export enum UserRole {
  EXPORTATOR = 'EXPORTATOR',
  BANK_AGENT = 'BANK_AGENT',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  keycloakId: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}
