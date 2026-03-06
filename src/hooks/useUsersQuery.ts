/**
 * Users Query Hooks - React Query integration for user CRUD operations.
 *
 * This module implements the Query Key Factory pattern for organized cache management.
 * Each mutation automatically invalidates related queries to keep the UI in sync.
 */
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} from "../services/usersApi";
import type { CreateUserRequest, UpdateUserRequest } from "../types/api.types";

/**
 * Query Key Factory - Centralized query key management.
 * Benefits:
 * - Type-safe query keys with "as const"
 * - Easy cache invalidation (invalidate "all" to clear everything user-related)
 * - Consistent naming across the app
 */
export const usersKeys = {
  all: ["users"] as const,
  list: () => [...usersKeys.all, "list"] as const,
  detail: (id: string) => [...usersKeys.all, "detail", id] as const,
};

export function useUserList() {
  return useQuery({
    queryKey: usersKeys.list(),
    queryFn: fetchUsers,
  });
}

export function useUser(id: string | undefined) {
  return useQuery({
    queryKey: usersKeys.detail(id ?? ""),
    queryFn: () => fetchUser(id!),
    enabled: !!id,
  });
}

/**
 * Mutations with automatic cache invalidation.
 * After each successful mutation, we invalidate related queries so the UI
 * automatically refetches fresh data without manual refresh.
 */

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserRequest) => createUser(data),
    onSuccess: () => {
      // Invalidate list so new user appears immediately
      queryClient.invalidateQueries({ queryKey: usersKeys.list() });
    },
  });
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserRequest) => updateUser(id, data),
    onSuccess: () => {
      // Invalidate both detail and list to ensure consistency everywhere
      queryClient.invalidateQueries({ queryKey: usersKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: usersKeys.list() });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate list to remove deleted user from UI
      queryClient.invalidateQueries({ queryKey: usersKeys.list() });
    },
  });
}
