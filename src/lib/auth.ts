import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
  exp: number;
}

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const isAuthenticated = () => {
  const token = getAccessToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getUserInfo = () => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    return jwtDecode<JWTPayload>(token);
  } catch {
    return null;
  }
};