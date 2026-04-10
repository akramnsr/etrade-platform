import axios from 'axios';
import { User } from '../types';

const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080';
const REALM = import.meta.env.VITE_KEYCLOAK_REALM || 'etrade';
const CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'etrade-frontend';

const tokenUrl = `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`;

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const login = async (username: string, password: string): Promise<AuthTokens> => {
  const { data } = await axios.post<AuthTokens>(
    tokenUrl,
    new URLSearchParams({
      grant_type: 'password',
      client_id: CLIENT_ID,
      username,
      password,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  return data;
};

export const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    try {
      await axios.post(
        `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/logout`,
        new URLSearchParams({
          client_id: CLIENT_ID,
          refresh_token: refreshToken,
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
    } catch {
      // Ignore logout errors
    }
  }
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getProfile = async (): Promise<User> => {
  const token = localStorage.getItem('access_token');
  if (!token) throw new Error('No access token');
  const { data } = await axios.get<User>(
    `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/userinfo`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const refreshToken = async (): Promise<AuthTokens> => {
  const rt = localStorage.getItem('refresh_token');
  if (!rt) throw new Error('No refresh token');
  const { data } = await axios.post<AuthTokens>(
    tokenUrl,
    new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      refresh_token: rt,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  return data;
};
