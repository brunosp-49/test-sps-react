/** Separação admin/user: hoje não há diferença de permissão na aplicação; a estrutura já está pronta para, no futuro, aplicar regras por papel (administradores e usuários com ações e limitações distintas). */
export type UserType = "admin" | "user";

export type User = {
  id: string;
  name: string;
  email: string;
  type: UserType;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  type: UserType;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  email?: string;
  type?: UserType;
  password?: string;
};

export type ValidationErrorResponse = {
  error: "Validation failed";
  details: Record<string, string[]>;
};

export type MessageErrorResponse = {
  error: string;
};

export type ApiErrorResponse = ValidationErrorResponse | MessageErrorResponse;

export function isValidationError(
  r: ApiErrorResponse
): r is ValidationErrorResponse {
  return r.error === "Validation failed" && "details" in r;
}
