/**
 * Auth Slice - Manages authentication state with Redux Toolkit.
 *
 * Key feature: Session persistence (rehydration)
 * On app load, we read token and user from localStorage to restore the session.
 * This allows users to stay logged in after page refresh (F5).
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../types/api.types";
import { clearStoredAuth, getStoredToken, getStoredUser } from "../services/api";
import { login as loginApi } from "../services/authApi";

type AuthState = {
  token: string | null;
  user: User | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

/**
 * Rehydrates auth state from localStorage on app initialization.
 * Validates that both token and user data exist and are properly structured.
 * If storage is inconsistent (token exists but user is invalid), clears everything
 * to prevent undefined behavior.
 */
function getInitialAuthState(): AuthState {
  const token = getStoredToken();
  const storedUser = getStoredUser();

  // Type guard: ensure stored user has all required User properties
  const user =
    storedUser &&
    typeof storedUser === "object" &&
    "id" in storedUser &&
    "name" in storedUser &&
    "email" in storedUser &&
    "type" in storedUser
      ? (storedUser as User)
      : null;

  // Only rehydrate if both token and valid user exist
  if (!token || !user) {
    if (token) clearStoredAuth(); // Clean up inconsistent storage state
    return { token: null, user: null, status: "idle", error: null };
  }
  return { token, user, status: "idle", error: null };
}

const initialState: AuthState = getInitialAuthState();

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await loginApi(credentials);
      return { token: res.token, user: res.user };
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string; details?: Record<string, string[]> } } };
      const data = axiosErr.response?.data;
      if (data?.error) {
        return rejectWithValue(data);
      }
      return rejectWithValue({ error: "Erro ao entrar. Tente novamente." });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      clearStoredAuth();
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        clearStoredAuth();
        state.token = null;
        state.user = null;
        state.status = "error";
        const payload = action.payload as { error?: string; details?: Record<string, string[]> };
        if (payload?.details) {
          const first = Object.values(payload.details).flat()[0];
          state.error = first ?? payload.error ?? "Erro ao entrar.";
        } else {
          state.error = payload?.error ?? "Erro ao entrar.";
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.token;
export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.status;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
