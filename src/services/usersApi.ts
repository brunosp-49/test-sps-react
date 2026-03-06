import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types/api.types";
import { getApiClient } from "./api";

export async function fetchUsers(): Promise<User[]> {
  const client = getApiClient();
  const { data } = await client.get<User[]>("/users");
  return Array.isArray(data) ? data : (data as { data?: User[] }).data ?? [];
}

export async function fetchUser(id: string): Promise<User> {
  const client = getApiClient();
  const { data } = await client.get<User>(`/users/${id}`);
  return data;
}

export async function createUser(payload: CreateUserRequest): Promise<User> {
  const client = getApiClient();
  const { data } = await client.post<User>("/users", payload);
  return data;
}

export async function updateUser(
  id: string,
  payload: UpdateUserRequest
): Promise<User> {
  const client = getApiClient();
  const { data } = await client.put<User>(`/users/${id}`, payload);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const client = getApiClient();
  await client.delete(`/users/${id}`);
}
