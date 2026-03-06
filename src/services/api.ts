/**
 * API Client Configuration
 *
 * Handles HTTP requests to the backend with automatic token injection
 * and centralized error handling for authentication failures.
 */
import axios, { type AxiosError } from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL;

// Storage keys for persisting auth data in localStorage
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): unknown | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function setStoredAuth(token: string, user: unknown): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Creates an Axios client with authentication and error handling.
 *
 * Features:
 * - Automatically injects Bearer token in Authorization header
 * - Global interceptor handles 401 (Unauthorized) and 303 (See Other) responses
 *   by clearing stored auth and redirecting to sign-in page
 *
 * Why 303? Some backends return 303 for session expiration or token invalidation.
 * We treat both as "session ended" to ensure consistent logout behavior.
 */
export function createApiClient(token: string | null) {
  const client = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    validateStatus: (status) => status >= 200 && status < 300,
  });

  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  // Response interceptor: handle auth failures globally
  client.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
      const status = err.response?.status;
      // 401 = invalid/expired token, 303 = session redirect (logout user)
      if (status === 401 || status === 303) {
        clearStoredAuth();
        window.location.href = "/signin";
      }
      return Promise.reject(err);
    }
  );

  return client;
}

export function getApiClient() {
  return createApiClient(getStoredToken());
}
