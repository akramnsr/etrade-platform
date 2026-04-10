import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { User, UserRole } from '../types';
import { login as loginService, logout as logoutService } from '../services/authService';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function parseJwt(token: string): Record<string, unknown> {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      const claims = parseJwt(storedToken);
      const roles = (claims['roles'] as string[]) || [];
      setUser({
        id: (claims['sub'] as string) || '',
        keycloakId: (claims['sub'] as string) || '',
        username: (claims['preferred_username'] as string) || '',
        email: (claims['email'] as string) || '',
        role: (roles[0] as UserRole) || UserRole.EXPORTATOR,
      });
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const tokens = await loginService(username, password);
      const claims = parseJwt(tokens.access_token);
      const roles = (claims['roles'] as string[]) || [];
      setUser({
        id: (claims['sub'] as string) || '',
        keycloakId: (claims['sub'] as string) || '',
        username: (claims['preferred_username'] as string) || '',
        email: (claims['email'] as string) || '',
        role: (roles[0] as UserRole) || UserRole.EXPORTATOR,
      });
      setToken(tokens.access_token);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await logoutService();
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, isLoading, isAuthenticated: !!user, login, logout }),
    [user, token, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
}
